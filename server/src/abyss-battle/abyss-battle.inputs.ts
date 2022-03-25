import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListAbyssBattleInput {
  @Field(() => Boolean, { nullable: true })
  f2p?: boolean;

  @Field(() => [String], { nullable: true })
  players?: string[];

  @Field(() => [String], { nullable: true })
  floorLevels?: string[];

  @Field(() => [Number], { nullable: true })
  battle_index?: number;

  @Field(() => [String], { nullable: true })
  charIds?: string[];

  @Field(() => Number, { nullable: true })
  totalStars?: number;
}
