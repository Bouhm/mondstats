import fs from 'fs';
import https from 'https';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import _ from 'lodash';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import Artifacts from './src/data/artifacts.json';
import ArtifactSets from './src/data/artifactSets.json';
import Characters from './src/data/characters.json';
import Weapons from './src/data/weapons.json';

const __dirname = dirname(fileURLToPath(import.meta.url));

(function downloadImages(){
  const download = (url, localPath, raw) => {
    var file = fs.createWriteStream(raw);
    https.get(url, function(response) {
      response.pipe(file)
    });

    file.on('finish', async function() {
      console.log("???")
      await imagemin([raw], {
        destination: localPath,
        plugins: [
          imageminPngquant({
            quality: [0.6, 0.8]
          })
        ]
      });
    })
  }

  _.forEach(Characters, character => {
    download(character.icon, path.resolve(__dirname, "./src/assets/characters"), path.resolve(__dirname, "./src/assets/characters/raw", `${character.oid}.png`))
    download(character.image, path.resolve(__dirname, "./src/assets/characters"), path.resolve(__dirname, "./src/assets/characters/raw", `${character.oid}_bg.png`))
    character.constellations.forEach(c => {
      download(c.icon, path.resolve(__dirname, "./src/assets/characters/constellations"), path.resolve(__dirname, "./src/assets/characters/constellations/raw", `${c.oid}.png`))
    })
  }) 

  _.forEach(ArtifactSets, artifactSet => {
    const artifact = _.find(Artifacts, artifact => artifact.set === artifactSet._id && artifact.pos === 5)
    download(artifact.icon, path.resolve(__dirname, "./src/assets/artifacts"), path.resolve(__dirname, "./src/assets/artifacts/raw", `${artifactSet.oid}.png`))
  })

  _.forEach(Weapons, weapon => {
    download(weapon.icon, path.resolve(__dirname, "./src/assets/weapons"), path.resolve(__dirname, "./src/assets/weapons/raw", `${weapon.oid}.png`))
  })
})()