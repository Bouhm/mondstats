import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Weapon {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Number)
  @Prop({ required: true, unique: true })
  oid: number;

  @Field(() => String)
  @Prop({ required: true })
  icon: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => Number)
  @Prop({ required: true })
  rarity: number;

  @Field(() => String)
  @Prop({ required: true })
  type_name: string;
}

export type WeaponDocument = Weapon & Document;
export const WeaponSchema = SchemaFactory.createForClass(Weapon);
export default mongoose.model<WeaponDocument>(Weapon.name, WeaponSchema);
