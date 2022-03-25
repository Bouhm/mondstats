import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListArtifactSetInput {
  @Field(() => [String], { nullable: true })
  ids?: string[];
}
