import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class DownloadOption {
  @Field()
  declare quality: string;

  @Field()
  declare format: string;

  @Field()
  declare downloadUrl: string;

  @Field()
  declare hasAudio: boolean;
}