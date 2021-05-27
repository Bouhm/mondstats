import fs from "fs"
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import https from "https"
import imagemin from "imagemin"
import imageminPngquant from 'imagemin-pngquant';

import Artifacts from './src/data/artifacts.json'
import Characters from './src/data/characters.json'
import Weapons from './src/data/weapons.json'

const __dirname = dirname(fileURLToPath(import.meta.url));

(function downloadImages(){
  const download = (url, localPath, raw) => {
    var file = fs.createWriteStream(raw);
    https.get(url, function(response) {
      response.pipe(file)
    });

    file.on('finish', async function() {
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

  for (const [id, character] of Object.entries(Characters)) {
    download(character.icon, path.resolve(__dirname, "./src/assets/characters"), path.resolve(__dirname, "./src/assets/characters/raw", `${character.id}.png`))
    download(character.image, path.resolve(__dirname, "./src/assets/characters"), path.resolve(__dirname, "./src/assets/characters/raw", `${character.id}_bg.png`))
    character.constellations.forEach(c => {
      download(c.icon, path.resolve(__dirname, "./src/assets/characters/constellations"), path.resolve(__dirname, "./src/assets/characters/constellations/raw", `${c.id}.png`))
    })
  }


  for (const [id, artifact] of Object.entries(Artifacts)) {
    download(artifact.icon, path.resolve(__dirname, "./src/assets/artifacts"), path.resolve(__dirname, "./src/assets/artifacts/raw", `${artifact.id}.png`))
  }

  for (const [id, weapon] of Object.entries(Weapons)) {
    download(weapon.icon, path.resolve(__dirname, "./src/assets/weapons"), path.resolve(__dirname, "./src/assets/weapons/raw", `${weapon.id}.png`))
  }
})()