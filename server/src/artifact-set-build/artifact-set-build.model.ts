import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';

import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
export class BuildSet {
  @Field(() => String)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'ArtifactSet',
    required: true,
  })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => Number)
  activation_number: number;
}

@ObjectType()
@Schema({ timestamps: true })
export class ArtifactSetBuild {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => [BuildSet])
  @Prop({
    required: true
  })
  sets: BuildSet[];
}

export type ArtifactSetBuildDocument = ArtifactSetBuild & Document;
export const ArtifactSetSchema = SchemaFactory.createForClass(ArtifactSetBuild);
export default mongoose.model<ArtifactSetBuildDocument>(ArtifactSetBuild.name, ArtifactSetSchema);
