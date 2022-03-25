import { find, findIndex, forEach, isEqual, map } from 'lodash';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// import abyssBattles from '../data/abyssBattles.json';
import { ListPlayerCharacterInput } from './player-character.inputs';
import { PlayerCharacter, PlayerCharacterDocument } from './player-character.model';

const BP_WEAPONS = [
  'The Black Sword',
  'Serpent Spine',
  'Solar Pearl',
  'The Viridescent Hunt',
  'Deathmatch',
];

const options = { maxTimeMS: 21600000, allowDiskUse: true, noCursorTimeout: true };

@Injectable()
export class PlayerCharacterService {
  constructor(
    @InjectModel(PlayerCharacter.name)
    private playerCharacterModel: Model<PlayerCharacterDocument>,
  ) {}

  async list(filter: ListPlayerCharacterInput = {}) {
    const playerCharacters = await this.playerCharacterModel
      .find()
      .lean()
      .populate([
        {
          path: 'character',
          select: 'rarity _id',
        },
        {
          path: 'player',
          select: 'total_star',
        },
        {
          path: 'weapon',
          select: 'rarity name _id',
        },
        {
          path: 'artifacts',
          select: 'set',
          populate: {
            path: 'set',
            select: 'affixes _id',
          },
        },
      ])
      .exec();

    const filteredCharacters = [];
    forEach(playerCharacters, (character) => {
      const _character = character as unknown as any;

      if (filter.charIds) {
        if (!filter.charIds.includes(_character.character._id.toString())) {
          return;
        }
      }

      if (filter.uids) {
        if (!filter.uids.includes(_character.player.uid)) {
          return;
        }
      }

      if (filter.f2p) {
        if (_character.weapon.rarity > 4 || BP_WEAPONS.includes(_character.weapon.name)) {
          return;
        }
      }

      if (filter.totalStars) {
        if (_character.player.total_star < filter.totalStars) {
          return;
        }
      }

      filteredCharacters.push(character);
    });

    return filteredCharacters;
  }

  getCharacterBuilds(characterId = '', matchExp = {}, limit = 10) {
    return this.playerCharacterModel
      .aggregate([
        {
          $match: {
            character: characterId,
            ...matchExp,
          },
        },
        {
          $group: {
            _id: {
              weapon: '$weapon',
              artifactSetBuild: '$artifactSetBuild',
              character: '$character',
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $group: {
            _id: {
              artifactSetBuild: '$_id.artifactSetBuild',
              character: '$_id.character',
            },
            count: {
              $sum: '$count',
            },
            weapons: {
              $push: {
                _id: '$_id.weapon',
                count: '$count',
              },
            },
          },
        },
        { $unwind: '$weapons' },
        { $sort: { 'weapons.count': -1 } },
        { $group: { _id: '$_id', count: { $sum: '$weapons.count' }, weapons: { $push: '$weapons' } } },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: limit,
        },
        {
          $project: {
            artifactSetBuildId: '$_id.artifactSetBuild',
            characterId: '$_id.character',
            count: 1,
            weapons: {
              $slice: ['$weapons', 0, 10],
            },
          },
        },
        {
          $project: {
            characterId: 1,
            _id: '$artifactSetBuildId',
            count: 1,
            weapons: 1,
          },
        },
      ])
      .option(options)
      .exec();
  }

  getCharacterCounts(matchExp = {}) {
    return this.playerCharacterModel
      .aggregate([
        {
          $match: matchExp,
        },
        {
          $group: {
            _id: '$character',
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
      ])
      .option(options)
      .exec();
  }

  getCharacterConstellationCount(matchExp = {}) {
    return this.playerCharacterModel
      .aggregate([
        {
          $match: matchExp,
        },
        {
          $group: {
            _id: {
              characterId: '$character',
              constellation: '$constellation',
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $group: {
            _id: '$_id.characterId',
            constellations: {
              $push: {
                constellation: '$_id.constellation',
                count: '$count',
              },
            },
          },
        },
      ])
      .option(options)
      .exec();
  }

  getWeaponTypeTotals(matchExp = {}) {
    return this.playerCharacterModel
      .aggregate([
        {
          $match: matchExp,
        },
        {
          $lookup: {
            from: 'weapons',
            localField: 'weapon',
            foreignField: '_id',
            pipeline: [
              {
                $project: {
                  _id: 0,
                  type_name: 1,
                },
              },
            ],
            as: 'weapon',
          },
        },
        {
          $project: {
            weapon: {
              $arrayElemAt: ['$weapon', 0],
            },
            star: 1,
          },
        },
        {
          $group: {
            _id: '$weapon.type_name',
            total: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            total: -1,
          },
        },
        {
          $project: {
            total: 1,
            weaponType: '$_id',
            _id: 0,
          },
        },
      ])
      .option(options)
      .exec();
  }

  getWeaponCounts(matchExp = {}, limit = 1000) {
    return this.playerCharacterModel
      .aggregate([
        {
          $match: matchExp,
        },
        {
          $group: {
            _id: '$weapon',
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: limit,
        },
      ])
      .option(options)
      .exec();
  }

  getCharacterWeaponCounts(matchExp = {}) {
    return this.playerCharacterModel
      .aggregate([
        {
          $match: matchExp,
        },
        {
          $group: {
            _id: {
              weaponId: '$weapon',
              characterId: '$character',
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $project: {
            weaponId: '$_id.weaponId',
            characterId: '$_id.characterId',
            count: 1,
            _id: 0,
          },
        },
      ])
      .option(options)
      .exec();
  }

  getCharacterArtifactSetBuildCounts(matchExp = {}) {
    return this.playerCharacterModel
      .aggregate([
        {
          $match: matchExp,
        },
        {
          $group: {
            _id: {
              artifactSetBuildId: '$artifactSetBuild',
              characterId: '$character',
            },
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $project: {
            artifactSetBuildId: '$_id.artifactSetBuildId',
            characterId: '$_id.characterId',
            count: 1,
            _id: 0,
          },
        },
      ])
      .option(options)
      .exec();
  }

  getArtifactSetBuildCounts(matchExp = {}, limit = 1000) {
    return this.playerCharacterModel
      .aggregate([
        {
          $match: matchExp,
        },
        {
          $group: {
            _id: '$artifactSetBuild',
            count: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            count: -1,
          },
        },
        {
          $limit: limit,
        },
      ])
      .option(options)
      .exec();
  }

  getCount() {
    return this.playerCharacterModel.find().lean().countDocuments();
  }
}
