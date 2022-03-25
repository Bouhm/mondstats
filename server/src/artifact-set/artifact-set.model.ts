import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType('Affix')
@Schema({ _id: false })
export class Affix {
  @Field(() => Number)
  activation_number: number;

  @Field(() => String)
  effect: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class ArtifactSet {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Number)
  @Prop({ required: true, unique: true })
  oid: number;

  @Field(() => Number)
  @Prop({ required: true })
  rarity: number;

  @Field(() => [Affix])
  @Prop({ required: true })
  affixes: Affix[];

  @Field(() => String)
  @Prop({ required: true })
  name: string;
}

export type ArtifactSetDocument = ArtifactSet & Document;
export const ArtifactSetSchema = SchemaFactory.createForClass(ArtifactSet);
export default mongoose.model<ArtifactSetDocument>(ArtifactSet.name, ArtifactSetSchema);
