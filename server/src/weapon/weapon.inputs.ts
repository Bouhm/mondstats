import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListWeaponInput {
  @Field(() => [Number], { nullable: true })
  oids?: number[];
}
