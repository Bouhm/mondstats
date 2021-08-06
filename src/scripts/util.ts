export function getShortName(char: { name: string, element: string }) {
  const charName = char.name === "Traveler" ? `${char.name}-${char.element}`.split(" ").join("").toLowerCase() : char.name.split(" ").join("").toLowerCase();
  return charName;
}

export function getCharacterFileName(char: { name: string, _id: string }) {
  return char.name === "Traveler" ? "traveler" : char._id;
}

export function numberWithCommas(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}