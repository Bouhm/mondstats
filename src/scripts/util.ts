export function getShortName(name: string) {
  return name.split(" ").join("").toLowerCase();
}

export function getCharacterFileName(char: { name: string, oid: number }) {
  return char.name === "Traveler" ? "traveler" : char.oid;
}