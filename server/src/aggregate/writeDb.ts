import fs from 'fs';
import { map } from 'lodash';

import artifactSetBuildModel from '../artifact-set-build/artifact-set-build.model';
import { ArtifactSetBuildService } from '../artifact-set-build/artifact-set-build.service';
import artifactSetModel from '../artifact-set/artifact-set.model';
import { ArtifactSetService } from '../artifact-set/artifact-set.service';
import artifactModel from '../artifact/artifact.model';
import { ArtifactService } from '../artifact/artifact.service';
import characterModel from '../character/character.model';
import { CharacterService } from '../character/character.service';
import weaponModel from '../weapon/weapon.model';
import { WeaponService } from '../weapon/weapon.service';

const characterService = new CharacterService(characterModel);
const weaponService = new WeaponService(weaponModel);
const artifactService = new ArtifactService(artifactModel);
const artifactSetService = new ArtifactSetService(artifactSetModel, artifactModel);
const artifactSetBuildService = new ArtifactSetBuildService(artifactSetBuildModel);

export const getDb = async () => {
  const characterDb = await characterService.db();
  const artifactDb = await artifactService.db();
  const artifactSetDb = await artifactSetService.db();
  const weaponDb = await weaponService.db();
  const artifactSetBuildDb = await artifactSetBuildService.db();
  return { characterDb, artifactDb, artifactSetDb, artifactSetBuildDb, weaponDb };
};

export const updateDb = async () => {
  const { characterDb, weaponDb, artifactDb, artifactSetDb, artifactSetBuildDb } = await getDb();

  fs.writeFile(
    'data/db.json',
    JSON.stringify({
      characters: characterDb,
      weapons: weaponDb,
      artifacts: artifactDb,
      artifactSets: artifactSetDb,
      artifactSetBuilds: artifactSetBuildDb,
    }),
    (e) => e,
  );
};
