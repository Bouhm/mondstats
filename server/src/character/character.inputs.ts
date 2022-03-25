import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListCharacterInput {
  @Field(() => [String], { nullable: true })
  ids?: string[];
}
