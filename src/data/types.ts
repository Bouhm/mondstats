export interface ICharacterData {
  _id: string,
  id: number,
  name: string,
  rarity: number,
  element: string
  constellations: {
    id: number,
    name: string,
    effect: string
  }[]
}

export interface IWeaponData {
  _id: string,
  id: number,
  name: string,
  rarity: number
}

export interface IArtifactSetData {
  _id: string,
  id: number,
  name: string,
  affixes: IAffix[]
}

export interface IAffix { 
  activation_number: number,
  effect: string
}

export interface ICharacterDb{
  [id: string]: ICharacterData
}

export interface IWeaponDb {
  [id: string]: IWeaponData
}

export interface IArtifactSetDb {
  [id: string]: IArtifactSetData
}

export interface ICharacterBuild {
  avg_level: number,
  constellations: number[],
  char_id: string,
  builds: IBuild[],
  total: number
}

export interface IWeaponBuild {
  _id: string,
  count: number
}

export interface IArtifactBuild {
  id: number,
  activation_number: number
}

export interface IBuild {
  weapons: IWeaponBuild[],
  artifacts: IArtifactBuild[]
}

export interface IAbyssBattle {
  floor_level: string,
  party_stats: {
    party: string[]
    count: number
  }[],
  total: number
}

