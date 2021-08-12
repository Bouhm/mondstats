import { forEach, reverse } from 'lodash';

import { IArtifactSet, IArtifactSetDb } from '../data/types';

export function getShortName(char: { name: string, element: string }) {
  const charName = char.name === "Traveler" ? `${char.name}-${char.element}`.split(" ").join("").toLowerCase() : char.name.split(" ").join("").toLowerCase();
  return charName;
}

export function getArtifactSetNames(artifacts: IArtifactSet[], db: IArtifactSetDb) {
  let label = "";

  forEach(artifacts, (set, i) => {
    let name = db[set._id].name;
    if (name.includes(" ")) {
      if (name.split(" ")[0] === "The") {
        name = name.split(" ")[1]
      } else {
        name = name.split(" ")[0]
      }
    }

    label += set.activation_number + "-" + name
    if (i !== artifacts.length - 1) label += " "
  })

  return label;
}

export function shortenId(_id: string) {
  return reverse(_id.split('')).splice(0, _id.length/2).join('');
}

export function getCharacterFileName(char: { name: string, _id: string }) {
  return char.name === "Traveler" ? "traveler" : shortenId(char._id);
}

export function numberWithCommas(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getPercentage(count: number, total: number) {
  return Math.round((count / total) * 100 * 10) / 10;
}