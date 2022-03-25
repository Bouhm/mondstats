import _ from 'lodash';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ListArtifactInput } from './artifact.inputs';
import { Artifact, ArtifactDocument } from './artifact.model';

@Injectable()
export class ArtifactService {
  constructor(
    @InjectModel(Artifact.name)
    private artifactModel: Model<ArtifactDocument>,
  ) {}

  list(filter: ListArtifactInput = {}) {
    const queryFilter = {};

    if (filter) {
      const { ids } = filter;
      if (ids && ids.length > 0) {
        queryFilter['id'] = { $in: ids };
      }
    }

    return this.artifactModel.find(queryFilter).lean().exec();
  }

  async db() {
    const artifacts = await this.artifactModel.find().lean().exec();
    _.forEach(artifacts, (artifact: any) => {
      delete artifact.__v;
      delete artifact.createdAt;
      delete artifact.updatedAt;
    });

    return artifacts;
  }
}
