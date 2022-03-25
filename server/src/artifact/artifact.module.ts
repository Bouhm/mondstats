import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Artifact, ArtifactSchema } from './artifact.model';
import { ArtifactResolver } from './artifact.resolver';
import { ArtifactService } from './artifact.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Artifact.name, schema: ArtifactSchema }])],
  providers: [ArtifactService, ArtifactResolver],
})
export class ArtifactModule {}
