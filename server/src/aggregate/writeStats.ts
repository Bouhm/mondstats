import fs from 'fs';
import {
  cloneDeep,
  difference,
  fill,
  filter,
  find,
  findIndex,
  flatten,
  flattenDeep,
  forEach,
  groupBy,
  intersection,
  isEqual,
  map,
  omit,
  orderBy,
  range,
  reduce,
  some,
  times,
  uniqWith,
  values,
} from 'lodash';

import abyssBattleModel from '../abyss-battle/abyss-battle.model';
import { AbyssBattleService } from '../abyss-battle/abyss-battle.service';
import characterModel from '../character/character.model';
import playerCharacterModel from '../player-character/player-character.model';
import { PlayerCharacterService } from '../player-character/player-character.service';
import { getTotal, groupById } from './util';
import { getDb } from './writeDb';

const abyssBattleService = new AbyssBattleService(abyssBattleModel);
const playerCharacterService = new PlayerCharacterService(playerCharacterModel);

type TeamStat = {
  party: string[];
  floorLevel?: string;
  battleIndex?: number;
  count: number;
  winCount?: number;
  avgStar?: number;
};

type Flex = {
  _id: string;
  count: number;
  winCount?: number;
  avgStar?: number;
};

const compareParties = (src, other) => {
  let compareFloors = true;
  if (src.floorLevel && src.battleIndex) {
    compareFloors = src.floorLevel === other.floorLevel && src.battleIndex === other.battleIndex;
  }

  return isEqual(src.party, other.party) && compareFloors;
};

const aggregateCoreTeams = (parties: TeamStat[]) => {
  const partyIndexes = [0, 1, 2, 3];
  const allIndexes = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ];

  let coreTeams: {
    coreParty: string[];
    count: number;
    flex: Flex[][];
    winCount?: number;
    avgStar?: number;
  }[] = [];

  forEach(parties, ({ party, count, winCount, avgStar }) => {
    forEach(allIndexes, (coreIndexes) => {
      const coreParty = [party[coreIndexes[0]], party[coreIndexes[1]], party[coreIndexes[2]]].sort();
      const partyIdx = findIndex(coreTeams, (team) => {
        return (
          isEqual(team.coreParty, coreParty) &&
          intersection(map(team.flex[0], (flex) => flex._id)).length > 0
        );
      });
      const flexIdx = difference(partyIndexes, coreIndexes)[0];

      if (partyIdx > -1) {
        // coreTeams[partyIdx].count += count;
        // coreTeams[partyIdx].winCount += winCount;
        // coreTeams[partyIdx].avgStar =
        //   (coreTeams[partyIdx].avgStar * coreTeams[partyIdx].count + avgStar * count) /
        //   (coreTeams[partyIdx].count + count);
        const charIdx = findIndex(coreTeams[partyIdx].flex[0], (flex) => flex._id === party[flexIdx]);

        if (charIdx > -1) {
          // coreTeams[partyIdx].flex[0][charIdx].count += count;
        } else {
          coreTeams[partyIdx].flex[0].push({
            _id: party[flexIdx],
            count,
            // winCount,
            // avgStar,
          });
        }
      } else {
        coreTeams.push({
          coreParty: coreParty,
          count,
          // winCount,
          // avgStar,
          flex: [
            [
              {
                _id: party[flexIdx],
                count,
                // winCount,
                // avgStar,
              },
            ],
          ],
        });
      }
    });
  });

  coreTeams = orderBy(coreTeams, 'count', 'desc');
  coreTeams.forEach((team, i) => {
    team.flex[0] = orderBy(team.flex[0], 'count', 'desc');
  });

  const combinedTeams = [];
  while (coreTeams.length) {
    const team1 = coreTeams[0];
    const compareTeams = cloneDeep(coreTeams.slice(1));
    const coreTeams2 = [];
    const prevCoreTeamsLen = coreTeams.length;

    let i = 0;
    while (i < compareTeams.length) {
      if (
        difference(
          [...compareTeams[i].coreParty, compareTeams[i].flex[0][0]._id],
          [...team1.coreParty, team1.flex[0][0]._id],
        ).length <= 1
      ) {
        coreTeams2.push(compareTeams[i]);
        compareTeams.splice(i, 1);
      } else {
        i++;
      }
    }

    if (team1) combinedTeams.push(team1);

    if (prevCoreTeamsLen === compareTeams.length) {
      coreTeams = coreTeams.slice(1);
    } else {
      coreTeams = compareTeams;
    }
  }

  const threshold = 0.2;
  combinedTeams.forEach((team) => {
    // const flexTotal = getTotal(team.flex);

    team.flex[0] = orderBy(
      filter(team.flex[0], (flex) => {
        return flex.count / team.count >= threshold;
      }),
      'count',
      'desc',
    );
  });

  const mergedTeams = [];
  combinedTeams.forEach((team) => {
    const teamIdx = findIndex(mergedTeams, (_team) => {
      if ((team.flex[0] && !team.flex[0].length) || (_team.flex[0] && !_team.flex[0].length)) return false;

      return isEqual(
        [...team.coreParty, team.flex[0][0]._id].sort(),
        [..._team.coreParty, _team.flex[0][0]._id].sort(),
      );
    });

    if (teamIdx > -1) {
      mergedTeams[teamIdx].flex.push(team.flex[0]);
      // mergedTeams[teamIdx].count += team.count;
    } else {
      mergedTeams.push(team);
    }
  });

  return orderBy(mergedTeams, 'count', 'desc');
};

export async function aggregateAll() {
  const { artifactSetDb, artifactSetBuildDb, characterDb, weaponDb } = await getDb();
  const characters = await characterModel.find();
  const characterIds = map(characters, ({ _id }) => _id);

  const allFloors = [];

  forEach(range(9, 13), (floor) => {
    forEach(range(1, 4), (stage) => {
      allFloors.push(`${floor}-${stage}`);
    });
  });

  const allCharFloors = [];

  forEach(range(9, 13), (floor) => {
    forEach(range(1, 4), (stage) => {
      forEach(range(1, 3), (battle) => {
        forEach(characterIds, (_id) => {
          allCharFloors.push({
            floor_level: `${floor}-${stage}`,
            battle_index: battle,
            characterId: _id,
          });
        });
      });
    });
  });

  const allTopTeams = flatten(
    await Promise.all(
      flattenDeep(map(characterIds, (characterId) => abyssBattleService.getTopParties(characterId))),
    ),
  );

  const topTeams = aggregateCoreTeams(uniqWith(allTopTeams, compareParties));
  fs.writeFileSync('data/abyss/stats/top-abyss-teams.json', JSON.stringify(topTeams));

  console.log('Done top parties');

  const allFloorTeams = flatten(
    await Promise.all(
      flattenDeep(
        map(allCharFloors, ({ floor_level, battle_index, characterId }) =>
          abyssBattleService.getTopFloorParties(floor_level, battle_index, characterId),
        ),
      ),
    ),
  );

  const groupedFloorTeams = groupBy(allFloorTeams, 'floorLevel');
  const topFloorTeams = {};

  Object.entries(groupedFloorTeams).forEach((floorData) => {
    const data = floorData[1];
    const floorLevel = floorData[0];

    const groupedBattleTeams = groupBy(data, 'battleIndex');
    Object.entries(groupedBattleTeams).forEach((battleData) => {
      const teams = uniqWith(battleData[1], compareParties);
      const battleIndex = battleData[0];

      if (!topFloorTeams[floorLevel]) topFloorTeams[floorLevel] = {};
      topFloorTeams[floorLevel][battleIndex] = aggregateCoreTeams(teams);
    });
  });

  for (const floorLevel of allFloors) {
    fs.writeFileSync(`data/abyss/${floorLevel}.json`, JSON.stringify(topFloorTeams[floorLevel]));
  }
  console.log('Done floor parties');

  // const characterConstellationCounts = groupById(
  //   await playerCharacterService.getCharacterConstellationCount(),
  // );

  // const characterAbyssConstellationCounts = groupById(
  //   await abyssBattleService.getCharacterAbyssConstellationCount(),
  // );

  // const characterAbyssStats: any = groupById(
  //   flatten(
  //     await Promise.all(
  //       flattenDeep(
  //         map(characterIds, (characterId) => abyssBattleService.getCharacterAbyssStats(characterId)),
  //       ),
  //     ),
  //   ),
  // );
  // console.log('Done character abyss stats');

  // const characterBuilds: any = groupById(
  //   flatten(
  //     await Promise.all(
  //       flattenDeep(map(characterIds, (_id) => playerCharacterService.getCharacterBuilds(_id))),
  //     ),
  //   ),
  //   'characterId',
  // );

  // const characterCounts: any = groupById(await playerCharacterService.getCharacterCounts());
  // console.log('Done character totals');

  // const characterBuildAbyssStats: any = groupById(
  //   flatten(
  //     await Promise.all(
  //       flattenDeep(map(characterIds, (_id) => abyssBattleService.getCharacterBuildAbyssStats(_id))),
  //     ),
  //   ),
  //   'characterId',
  // );
  // console.log('Done character build stats');

  // const characterBuildData: any = {};
  // forEach(characterBuilds, (builds, characterId) => {
  //   characterBuildData[characterId] = {
  //     constellations: map(
  //       orderBy(characterConstellationCounts[characterId][0].constellations, 'constellation', 'asc'),
  //       (c) => c.count,
  //     ),
  //     builds: orderBy(
  //       map(values(builds), (build) => omit(build, 'characterId')),
  //       'count',
  //       'desc',
  //     ),
  //     count: characterCounts[characterId][0].count,
  //   };
  // });

  // const topCharacters = [];
  // const characterBuildAbyssData: any = {};
  // forEach(characterBuildAbyssStats, (stats, characterId) => {
  //   characterBuildAbyssData[characterId] = {
  //     constellations: map(
  //       orderBy(characterAbyssConstellationCounts[characterId][0].constellations, 'constellation', 'asc'),
  //       (c) => c.count,
  //     ),
  //     builds: orderBy(
  //       map(values(stats), (stat) => omit(stat, 'characterId')),
  //       'count',
  //       'desc',
  //     ),
  //     count: characterAbyssStats[characterId][0].count,
  //   };
  // });

  // forEach(characterIds, (characterId) => {
  //   const charData = {
  //     _id: characterId,
  //     data: characterBuildData[characterId],
  //   };

  //   const abyssCharData = {
  //     _id: characterId,
  //     data: characterBuildAbyssData[characterId],
  //   };

  //   fs.writeFileSync(`data/characters/${characterId.toString()}.json`, JSON.stringify(charData));
  //   fs.writeFileSync(
  //     `data/characters/abyss/${characterId.toString()}.json`,
  //     JSON.stringify(abyssCharData),
  //   );

  //   if (characterCounts[characterId] && characterAbyssStats[characterId]) {
  //     topCharacters.push({
  //       _id: characterId,
  //       count: characterCounts[characterId][0].count,
  //       abyssCount: characterAbyssStats[characterId][0].count,
  //     });
  //   }
  // });

  // fs.writeFileSync(
  //   `data/characters/stats/top-characters.json`,
  //   JSON.stringify({
  //     characters: orderBy(topCharacters, 'count', 'desc'),
  //     totals: {
  //       total: getTotal(topCharacters, 'count'),
  //       abyssTotal: getTotal(topCharacters, 'abyssCount'),
  //     },
  //   }),
  // );
  // console.log('Done character builds');

  // const weaponCounts = await playerCharacterService.getWeaponCounts();
  // const characterWeaponCounts = groupById(
  //   await playerCharacterService.getCharacterWeaponCounts(),
  //   'characterId',
  // );
  // const weaponAbyssStats: any = groupById(await abyssBattleService.getWeaponAbyssStats());
  // const weaponTypeTotals: any = await playerCharacterService.getWeaponTypeTotals();
  // const weaponTypeAbyssTotals: any = await abyssBattleService.getWeaponTypeAbyssTotals();
  // const artifactSetAbyssStats = groupById(await abyssBattleService.getArtifactSetBuildAbyssStats());
  // const characterArtifactSetBuildCounts = groupById(
  //   await playerCharacterService.getCharacterArtifactSetBuildCounts(),
  //   'characterId',
  // );
  // const artifactSetBuildCounts = await playerCharacterService.getArtifactSetBuildCounts();
  // console.log('Done artifactset totals');

  // const topWeapons = [];
  // const topWeaponTotals = {};
  // forEach(weaponCounts, (weaponCount) => {
  //   const weaponCharacters: { _id: string; count: number }[] = [];
  //   forEach(characterIds, (charId) => {
  //     if (!characterWeaponCounts[charId]) return;

  //     const setIdx = findIndex(
  //       characterWeaponCounts[charId],
  //       ({ weaponId }) => weaponId.toString() === weaponCount._id.toString(),
  //     );

  //     if (setIdx > -1) {
  //       weaponCharacters.push({
  //         _id: charId,
  //         count: characterWeaponCounts[charId][setIdx].count,
  //       });
  //     }
  //   });

  //   if (weaponAbyssStats[weaponCount._id]) {
  //     // const { winCount, avgStar } = weaponAbyssStats[weaponCount._id][0];
  //     const weapon = find(weaponDb, (weapon) => weapon._id.toString() == weaponCount._id.toString());

  //     if (!weapon) return;

  //     const typeTotal = find(
  //       weaponTypeTotals,
  //       (typeCount) => typeCount.weaponType === weapon.type_name,
  //     ).total;

  //     const typeAbyssTotal = find(
  //       weaponTypeAbyssTotals,
  //       (typeCount) => typeCount.weaponType === weapon.type_name,
  //     ).total;

  //     const weaponData = {
  //       _id: weaponCount._id,
  //       count: weaponCount.count,
  //       typeTotal,
  //       abyssCount: weaponAbyssStats[weaponCount._id][0].count,
  //       abyssTypeTotal: typeAbyssTotal,
  //       characters: orderBy(weaponCharacters, 'count', 'desc'),
  //     };

  //     topWeapons.push({
  //       _id: weaponCount._id,
  //       count: weaponCount.count,
  //       abyssCount: weaponAbyssStats[weaponCount._id][0].count,
  //     });

  //     if (!topWeaponTotals[weapon.type_name]) {
  //       topWeaponTotals[weapon.type_name] = {
  //         typeTotal,
  //         abyssTypeTotal: typeAbyssTotal,
  //       };
  //     }
  //     fs.writeFileSync(`data/weapons/${weaponCount._id.toString()}.json`, JSON.stringify(weaponData));
  //   }
  // });

  // fs.writeFileSync(
  //   `data/weapons/stats/top-weapons.json`,
  //   JSON.stringify({ weapons: orderBy(topWeapons, 'count', 'desc'), totals: topWeaponTotals }),
  // );

  // const topArtifactSetBuilds = [];
  // const artifactSetData: any = [];

  // forEach(artifactSetBuildCounts, (artifactSetBuildCount) => {
  //   const artifactCharacters: { _id: string; count: number }[] = [];
  //   forEach(characterIds, (charId) => {
  //     if (!characterArtifactSetBuildCounts[charId]) return;

  //     const setIdx = findIndex(
  //       characterArtifactSetBuildCounts[charId],
  //       ({ artifactSetBuildId }) => artifactSetBuildId.toString() === artifactSetBuildCount._id.toString(),
  //     );

  //     if (setIdx > -1) {
  //       artifactCharacters.push({
  //         _id: charId,
  //         count: characterArtifactSetBuildCounts[charId][setIdx].count,
  //       });
  //     }
  //   });

  //   if (artifactSetAbyssStats[artifactSetBuildCount._id]) {
  //     // const { winCount, avgStar } = artifactSetAbyssStats[artifactSetBuildCount._id][0];

  //     artifactSetData.push({
  //       _id: artifactSetBuildCount._id,
  //       count: artifactSetBuildCount.count,
  //       abyssCount: artifactSetAbyssStats[artifactSetBuildCount._id][0].count,
  //       characters: orderBy(artifactCharacters, 'count', 'desc'),
  //     });

  //     topArtifactSetBuilds.push({
  //       _id: artifactSetBuildCount._id,
  //       count: artifactSetBuildCount.count,
  //       abyssCount: artifactSetAbyssStats[artifactSetBuildCount._id][0].count,
  //     });
  //   }
  // });

  // fs.writeFileSync(
  //   `data/artifactSets/stats/top-artifact-set-builds.json`,
  //   JSON.stringify({
  //     artifactSetBuilds: orderBy(topArtifactSetBuilds, 'count', 'desc'),
  //     totals: {
  //       total: getTotal(topArtifactSetBuilds, 'count'),
  //       abyssTotal: getTotal(topArtifactSetBuilds, 'abyssCount'),
  //     },
  //   }),
  // );

  // for (const data of artifactSetDb) {
  //   const buildIds = map(
  //     filter(artifactSetBuildDb, ({ sets }) =>
  //       some(sets, (set) => data._id && set._id && data._id.toString() === set._id.toString()),
  //     ),
  //     (setBuild) => setBuild._id,
  //   );
  //   const allSetData = filter(
  //     map(buildIds, (buildId) =>
  //       find(artifactSetData, (set) => set._id.toString() === buildId.toString()),
  //     ),
  //     (data) => !!data,
  //   );

  //   const setData = {
  //     _id: data._id,
  //     artifactSetBuilds: allSetData,
  //   };
  //   fs.writeFileSync(`data/artifactSets/${data._id.toString()}.json`, JSON.stringify(setData));
  // }
}
