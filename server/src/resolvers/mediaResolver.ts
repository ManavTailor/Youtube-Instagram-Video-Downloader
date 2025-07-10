import { Resolver, Query, Arg } from 'type-graphql';
import { MediaPreview } from '../entities/MediaPreview';
import { YoutubeService } from '../services/YoutubeService';
import { InstagramService } from '../services/InstagramService';

@Resolver()
export class MediaResolver {
  @Query(() => MediaPreview, { nullable: true })
  async getMediaPreview(
    @Arg('url') url: string,
    @Arg('service') service: string
  ): Promise<MediaPreview | null> {
    switch (service) {
      case 'YouTube':
        return new YoutubeService().getMediaPreview(url);
      case 'Instagram':
      case 'Instagram Story':
        return new InstagramService().getMediaPreview(url);
      default:
        return null;
    }
  }
}