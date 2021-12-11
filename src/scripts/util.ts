import { forEach, reverse } from 'lodash';

import { IArtifactSet, IArtifactSetDb } from '../data/types';

export function getShortName(item: { name: string, element?: string }) {
  const shortName = item.name === "Traveler" ? `${item.name}-${item.element}`.split(" ").join("").toLowerCase() : item.name.split(" ").join("").toLowerCase();
  return shortName.replace(/[^\w\s]/gi, '');
}

export function getArtifactSetNames(artifacts: IArtifactSet[], db: IArtifactSetDb) {
  let label = "";

  forEach(artifacts, (set, i) => {
    let dbSet = db[set._id]

    if (dbSet) {
      let name = dbSet.name;
      
      if (name.includes(" ")) {
        if (name.split(" ")[0] === "The") {
          name = name.split(" ")[1]
        } else {
          name = name.split(" ")[0]
        }
      }
  
      label += set.activation_number + "-" + name
      if (i !== artifacts.length - 1) label += " "
    }
  })

  return label;
}

// export function shortenId(_id: string) {
//   return reverse(_id.split('')).splice(0, _id.length/2).join('');
// }

export function getCharacterLabel(char: { name: string, element: string }) {
  return char.name === "Traveler" ? `Traveler (${char.element})` : char.name;
}

export function getCharacterFileName(char: { name: string, _id: string }) {
  return char.name === "Traveler" ? "traveler" : char._id;
}

export function numberWithCommas(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getPercentage(count: number, total: number) {
  if (!count || !total) return 0;
  return Math.round((count / total) * 100 * 10) / 10;
}