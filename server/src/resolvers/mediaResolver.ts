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
    const normalizedService = service.trim().toLowerCase();
    console.log('Requested service:', service, 'Normalized:', normalizedService);
    switch (normalizedService) {
      case 'youtube':
        return new YoutubeService().getMediaPreview(url);
      case 'instagram':
      case 'instagram story':
        return new InstagramService().getMediaPreview(url);
      default:
        return null;
    }
  }
}

