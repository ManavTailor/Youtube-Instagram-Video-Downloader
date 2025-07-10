import ytdl from '@distube/ytdl-core';
import { MediaPreview } from '../entities/MediaPreview';
import { DownloadOption } from '../entities/DownloadOption';

export class YoutubeService {
  async getMediaPreview(url: string): Promise<MediaPreview> {
    const videoInfo = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        },
      },
    });
    const { videoDetails } = videoInfo;

    const qualityMap = new Map<string, DownloadOption>();
    videoInfo.formats
      .filter((format) => format.qualityLabel)
      .forEach((format) => {
        if (!qualityMap.has(format.qualityLabel)) {
          qualityMap.set(format.qualityLabel, {
            quality: format.qualityLabel,
            format: format.container,
            downloadUrl: format.url,
            hasAudio: format.hasAudio,
          });
        }
      });

    const downloadOptions = Array.from(qualityMap.values());

    const audioFormat = ytdl.chooseFormat(videoInfo.formats, {
      quality: 'highestaudio',
      filter: 'audioonly',
    });

    return {
      title: videoDetails.title,
      thumbnailUrl: videoDetails.thumbnails[0].url,
      duration: parseInt(videoDetails.lengthSeconds, 10),
      source: 'YouTube',
      downloadOptions,
      audioUrl: audioFormat ? audioFormat.url : undefined,
    };
  }
}