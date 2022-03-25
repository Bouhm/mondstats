import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { BuildSet } from '../artifact-set-build/artifact-set-build.model';

@ObjectType()
@Schema({ timestamps: true })
export class PlayerCharacter {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Character',
    required: true,
  })
  character: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Player',
    required: true,
  })
  player: MongooseSchema.Types.ObjectId;

  @Field(() => [String])
  @Prop()
  artifactSets: BuildSet[];

  @Field(() => String)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ArtifactSetBuild',
    required: true,
  })
  artifactSetBuild: MongooseSchema.Types.ObjectId;

  @Field(() => Number)
  @Prop({ required: true })
  constellation: number;

  @Field(() => Number)
  @Prop({ required: true })
  fetter: number;

  @Field(() => Number)
  @Prop({ required: true })
  level: number;

  @Field(() => Number)
  strongest_strike: number;

  @Field(() => String)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Weapon',
    required: true,
  })
  weapon: MongooseSchema.Types.ObjectId;
}

export type PlayerCharacterDocument = PlayerCharacter & Document;
export const PlayerCharacterSchema = SchemaFactory.createForClass(PlayerCharacter);
export default mongoose.model<PlayerCharacterDocument>(PlayerCharacter.name, PlayerCharacterSchema);
