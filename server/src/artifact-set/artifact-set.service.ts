import genshindb from 'genshin-db';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Artifact, ArtifactDocument } from '../artifact/artifact.model';
import { ListArtifactSetInput } from './artifact-set.inputs';
import { ArtifactSet, ArtifactSetDocument } from './artifact-set.model';

@Injectable()
export class ArtifactSetService {
  constructor(
    @InjectModel(ArtifactSet.name)
    private artifactSetModel: Model<ArtifactSetDocument>,

    @InjectModel(Artifact.name)
    private artifactModel: Model<ArtifactDocument>,
  ) {}

  list(filter: ListArtifactSetInput) {
    const queryFilter = {};

    if (filter) {
      const { ids } = filter;
      if (ids && ids.length > 0) {
        queryFilter['id'] = { $in: ids };
      }
    }

    return this.artifactSetModel.find(queryFilter).lean().exec();
  }

  async db() {
    const artifactSets = await this.artifactSetModel.find().lean().exec();
    const filteredSets = [];
    artifactSets.forEach((set: any) => {
      const dbSet = genshindb.artifacts(set.name);

      if (dbSet && dbSet.rarity) {
        set.rarity = parseInt(dbSet.rarity.pop());
        if (set.rarity && set.rarity > 3) {
          delete set.__v;
          delete set.createdAt;
          delete set.updatedAt;

          set.affixes.forEach((affix, i) => delete set.affixes[i]._id);
          filteredSets.push(set);
        }
      }
    });

    return filteredSets;
  }
}
