export function getShortName(name: string) {
  return name.split(" ").join("").replace("-", "").toLocaleLowerCase();
}

