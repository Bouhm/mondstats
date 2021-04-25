export interface ICharData {
  id: number
  name: string
  constellations: number[]
  weapons: { id: number, count: number }[]
  artifacts: { sets: { id: number, activation_number: number }[] }[],
}

export interface IArtifact {
  id: number,
  name: string,
  icon: string,
  pos: number,
  rarity: number,
  set: {
    id: number,
    name: number,
    affixes: {
      activation_number: number,
      effect: string
    }[]
  },
  pos_name: string
}

export interface ICharacter {
  id: number,
  image: string,
  icon: string,
  name: string,
  element: string,
  rarity: number,
  constellations: {
    id: number,
    name: string,
    icon: string,
    effect: string,
    pos: number
  }[]
}

export interface IWeapon {
  id: number,
  name: string,
  icon: string,
  type: number,
  rarity: number,
  type_name: string,
  desc: string
}
