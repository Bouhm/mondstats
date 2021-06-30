export interface ICharacterData {
  _id: string,
  oid: number,
  name: string,
  rarity: number,
  element: string
  constellations: {
    oid: number,
    name: string,
    effect: string
  }[]
}

export interface IWeaponData {
  _id: string,
  oid: number,
  name: string,
  rarity: number
}

export interface IArtifactData {
  _id: string,
  oid: number,
  name: string,
  set: string
}

export interface IArtifactSetData {
  _id: string,
  oid: number,
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

export interface IArtifactDb {
  [id: string]: IArtifactData
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
  _id: string,
  activation_number: number
}

export interface IBuild {
  weapons: IWeaponBuild[],
  artifacts: IArtifactBuild[]
  count: number
}

export interface IAbyssBattle {
  floor_level: string,
  party_stats: {
    party: string[]
    count: number
  }[][]
}

