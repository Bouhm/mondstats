import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListPlayerInput {
  @Field(() => [Number], { nullable: true })
  uids?: number[];
}
