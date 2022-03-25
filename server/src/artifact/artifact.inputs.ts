import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListArtifactInput {
  @Field(() => [String], { nullable: true })
  ids?: string[];
}
