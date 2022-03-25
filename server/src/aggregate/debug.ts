import fs from 'fs';
import {
  cloneDeep,
  difference,
  filter,
  find,
  findIndex,
  flatten,
  flattenDeep,
  forEach,
  groupBy,
  includes,
  intersection,
  isEqual,
  map,
  orderBy,
  range,
  reduce,
  some,
  times,
  uniq,
  uniqWith,
  values,
} from 'lodash';

import abyssBattleModel from '../abyss-battle/abyss-battle.model';
import { AbyssBattleService } from '../abyss-battle/abyss-battle.service';
import characterModel from '../character/character.model';
import { CharacterService } from '../character/character.service';
import playerCharacterModel from '../player-character/player-character.model';
import { PlayerCharacterService } from '../player-character/player-character.service';
import connectDb from '../util/connection';
import weaponModel from '../weapon/weapon.model';
import { getDb } from './writeDb';

const abyssBattleService = new AbyssBattleService(abyssBattleModel);
const playerCharacterService = new PlayerCharacterService(playerCharacterModel);

function groupById(obj: any, field = '_id') {
  return reduce(
    obj,
    (res, curr) => {
      res[curr[field]] = res[curr[field]] || [];
      res[curr[field]].push(curr);
      return res;
    },
    {},
  );
}

const compareParties = (src, other) => {
  let compareFloors = true;
  if (src.floorLevel && src.battleIndex) {
    compareFloors = src.floorLevel === other.floorLevel && src.battleIndex === other.battleIndex;
  }

  return isEqual(src.party, other.party) && compareFloors;
};

(async () => {
  await connectDb();
  const { artifactSetDb, artifactSetBuildDb, characterDb, weaponDb } = await getDb();
  const characters = await characterModel.find();
  const characterIds = map(characters, ({ _id }) => _id);

  const a = await playerCharacterService.getCharacterArtifactSetBuildCounts();
  const b = groupById(a, 'characterId');
  console.log(b)
  console.log(a)
})();
