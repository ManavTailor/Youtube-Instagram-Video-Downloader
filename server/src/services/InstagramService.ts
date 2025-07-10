import { MediaPreview } from '../entities/MediaPreview';
import { DownloadOption } from '../entities/DownloadOption';
import instagramSave from 'instagram-save';

export class InstagramService {
  async getMediaPreview(url: string): Promise<MediaPreview> {
    const result = await instagramSave(url, './');
    const downloadOptions: DownloadOption[] = [
      {
        quality: 'HD',
        format: result.type,
        downloadUrl: result.url,
        hasAudio: true,
      },
    ];

    return {
      title: 'Instagram Media',
      thumbnailUrl: result.url,
      source: 'Instagram',
      downloadOptions,
    };
  }
}