import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Artifact, ArtifactSchema } from '../artifact/artifact.model';
import { ArtifactModule } from '../artifact/artifact.module';
import { ArtifactSet, ArtifactSetSchema } from './artifact-set.model';
import { ArtifactSetResolver } from './artifact-set.resolver';
import { ArtifactSetService } from './artifact-set.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ArtifactSet.name, schema: ArtifactSetSchema }]),
    MongooseModule.forFeature([{ name: Artifact.name, schema: ArtifactSchema }]),
  ],
  providers: [ArtifactSetService, ArtifactSetResolver, ArtifactModule],
})
export class ArtifactSetModule {}
