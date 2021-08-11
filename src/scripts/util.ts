import { reverse } from 'lodash';

export function getShortName(char: { name: string, element: string }) {
  const charName = char.name === "Traveler" ? `${char.name}-${char.element}`.split(" ").join("").toLowerCase() : char.name.split(" ").join("").toLowerCase();
  return charName;
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