import { forEach } from 'lodash';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ListCharacterInput } from './character.inputs';
import { Character, CharacterDocument } from './character.model';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>,
  ) {}

  findById(id: string) {
    return this.characterModel.findById(id).lean();
  }

  list(filter: ListCharacterInput = {}) {
    const queryFilter = {};

    if (filter) {
      const { ids } = filter;
      if (ids && ids.length > 0) {
        queryFilter['_id'] = { $in: ids };
      }
    }

    return this.characterModel.find(queryFilter).lean().exec();
  }

  async db() {
    const characters = await this.characterModel.find().lean().exec();

    forEach(characters, (character: any) => {
      delete character.__v;
      delete character.createdAt;
      delete character.updatedAt;
      forEach(character.constellations, (c, i) => {
        if (character.constellations[i]) delete character.constellations[i]._id;
      });
    });

    return characters;
  }
}
