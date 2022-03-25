import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { PlayerCharacter } from '../player-character/player-character.model';
import { Player } from '../player/player.model';

@ObjectType('PartyStats')
export class PartyStats {
  @Field(() => [String])
  party: string[];

  @Field(() => Number)
  count: number;
}

@ObjectType('AbyssStats')
export class AbyssStats {
  @Field(() => [[PartyStats]])
  battle_parties: PartyStats[][];

  @Field(() => String)
  floor_level: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class AbyssBattle {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  floor_level: string;

  @Field(() => Number)
  @Prop({ required: true })
  battle_index: number;

  // @Field(() => Number)
  // @Prop({ required: true })
  // star: number;

  @Field(() => String)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Player.name,
    required: true,
  })
  player: MongooseSchema.Types.ObjectId;

  @Field(() => [String])
  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'PlayerCharacter',
    required: true,
  })
  party: MongooseSchema.Types.ObjectId[];
}

export type AbyssBattleDocument = AbyssBattle & Document;
export const AbyssBattleSchema = SchemaFactory.createForClass(AbyssBattle);
export default mongoose.model<AbyssBattleDocument>(AbyssBattle.name, AbyssBattleSchema);
