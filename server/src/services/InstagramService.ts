import { MediaPreview } from "../entities/MediaPreview";
import { DownloadOption } from "../entities/DownloadOption";
import { instagramGetUrl } from "instagram-url-direct";

export class InstagramService {
  async getMediaPreview(url: string): Promise<MediaPreview | null> {
    try {
      const result = await instagramGetUrl(url);
      if (!result || !result.url_list || result.url_list.length === 0) {
        return null;
      }
      console.log("resssss", result);
      const downloadOptions: DownloadOption[] = result.url_list.map(
        (mediaUrl: string, index: number) => {
          const media = result.media_details?.[index];

          const isVideo = media?.type === "video";

          return {
            quality: "HD",
            format: isVideo ? "mp4" : "jpg",
            downloadUrl: mediaUrl,
            hasAudio: isVideo,
          };
        }
      );

      return {
        title: "Instagram Media",
        thumbnailUrl: result.url_list[0],
        source: "Instagram",
        downloadOptions,
        mediaItems: downloadOptions,
      };
    } catch (error) {
      console.error("InstagramService error:", error);
      return null;
    }
  }
  // async getMediaPreview(url: string): Promise<MediaPreview | null> {
  //   try {
  //     const result = await instagramSave(url, './');
  //     const downloadOptions: DownloadOption[] = [
  //       {
  //         quality: 'HD',
  //         format: result.type,
  //         downloadUrl: result.url,
  //         hasAudio: true,
  //       },
  //     ];
  //     const mediaItems = downloadOptions;

  //     return {
  //       title: 'Instagram Media',
  //       thumbnailUrl: result.url,
  //       source: 'Instagram',
  //       downloadOptions,
  //       mediaItems,
  //     };
  //   } catch (error: any) {
  //     console.error('InstagramService error:', error);
  //     return null;
  //   }
  // }
}
