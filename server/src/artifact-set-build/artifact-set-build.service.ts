import { forEach } from 'lodash';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ArtifactSetBuild, ArtifactSetBuildDocument } from './artifact-set-build.model';

@Injectable()
export class ArtifactSetBuildService {
  constructor(
    @InjectModel(ArtifactSetBuild.name)
    private artifactSetBuildModel: Model<ArtifactSetBuildDocument>,
  ) {}

  async db() {
    const artifactSetBuilds = await this.artifactSetBuildModel.find().lean().exec();
    forEach(artifactSetBuilds, (setBuild: any) => {
      delete setBuild.__v;
      delete setBuild.createdAt;
      delete setBuild.updatedAt;
    });

    return artifactSetBuilds;
  }
}
