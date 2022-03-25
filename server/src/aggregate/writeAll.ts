import fs from 'fs';
import { map } from 'lodash';
import mongoose from 'mongoose';

import { cleanup } from '../util';
import connectDb from '../util/connection';
import { updateRepo } from './githubApi';
import { updateDb } from './writeDb';
import { aggregateAll } from './writeStats';

// import { aggregateFeatured } from './writeFeatured';
// import { aggregateBuildsAndTeams } from './writeStats';

(async () => {
  await connectDb();

  const dirs = ['characters', 'artifactSets', 'weapons', 'abyss'];

  if (!fs.existsSync('data')) {
    fs.mkdir('data', { recursive: true }, (e) => e);
  }

  await Promise.all(
    map(dirs, (dir) => {
      if (!fs.existsSync(`data/${dir}`)) {
        return fs.mkdir(`data/${dir}`, { recursive: true }, (e) => e);
      }
    }),
  );

  await Promise.all(
    map(dirs, (dir) => {
      if (!fs.existsSync(`data/${dir}/stats`)) {
        return fs.mkdir(`data/${dir}/stats`, { recursive: true }, (e) => e);
      }
    }),
  );

  if (!fs.existsSync(`data/characters/mains`)) {
    fs.mkdir(`data/characters/mains`, { recursive: true }, (e) => e);
  }

  if (!fs.existsSync(`data/characters/abyss`)) {
    fs.mkdir(`data/characters/abyss`, { recursive: true }, (e) => e);
  }

  try {
    // await updateDb();
    await aggregateAll();

    await updateRepo(process.env.npm_config_branch || 'develop');
  } catch (err) {
    console.log(err);
  }

  await mongoose.connection.close();
})();
