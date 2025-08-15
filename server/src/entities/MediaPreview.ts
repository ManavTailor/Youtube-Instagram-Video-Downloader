import { ObjectType, Field, Int } from 'type-graphql';
import { DownloadOption } from './DownloadOption';

@ObjectType()
export class MediaPreview {
  @Field()
   declare title: string;

  @Field()
  declare thumbnailUrl: string;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field()
  declare source: string;

  @Field(() => [DownloadOption], { nullable: true })
  mediaItems?: DownloadOption[];

  @Field(() => [DownloadOption])
  declare downloadOptions: DownloadOption[];

  @Field(() => String, { nullable: true })
  audioUrl?: string;
}