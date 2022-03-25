import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType('Constellation')
class Constellation {
  @Field(() => String)
  effect: string;

  @Field(() => Number)
  oid: number;

  @Field(() => String)
  name: string;

  @Field(() => Number)
  pos: number;

  @Field(() => String)
  icon: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Character {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Number)
  @Prop({ required: true, unique: true })
  oid: number;

  @Field(() => [Constellation])
  @Prop({ required: true })
  constellations: Constellation[];

  @Field(() => String)
  @Prop({ required: true })
  element: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => Number)
  @Prop({ required: true })
  rarity: number;

  @Field(() => String)
  @Prop({ required: true })
  icon: string;

  @Field(() => Number)
  @Prop({ required: true })
  weapon_type: number;

  @Field(() => String)
  @Prop({ required: true })
  image: string;
}

export type CharacterDocument = Character & Document;
export const CharacterSchema = SchemaFactory.createForClass(Character);
export default mongoose.model<CharacterDocument>(Character.name, CharacterSchema);
