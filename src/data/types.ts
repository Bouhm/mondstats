export interface ICharacterData {
  _id: string,
  oid: number,
  name: string,
  rarity: number,
  element: string
  constellations: {
    _id: string,
    oid: number,
    name: string,
    effect: string
  }[]
}

export interface IWeaponData {
  _id: string,
  oid: number,
  name: string,
  type_name: string,
  rarity: number,
  baseAtk: string,
  subStat: string, 
  subValue: string,
  effect: string,
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
  rarity: number,
  affixes: IAffix[]
}

export interface IArtifactSetBuildData {
  _id: string,
  sets: IArtifactSet[]
}

export interface IAffix { 
  activation_number: number,
  effect: string
}

export interface ICharacterDb{
  [_id: string]: ICharacterData
}

export interface IWeaponDb {
  [_id: string]: IWeaponData
}

export interface IArtifactDb {
  [_id: string]: IArtifactData
}

export interface IArtifactSetDb {
  [_id: string]: IArtifactSetData
}

export interface IArtifactSetBuildDb {
  [_id: string]: IArtifactSetBuildData
}

export interface IWeaponBuild {
  _id: string,
  count: number,
}

export interface IArtifactSet {
  _id: string,
  activation_number: number,
}

export interface IBuild {
  _id: string,
  weapons: IWeaponBuild[],
  count: number
}

export interface IAbyssBuild {
  _id: string,
  weapons: IWeaponBuild[],
  count: number,
  // avgStar: number,
  // winCount: number
}

export type IAbyssFloor = { [battleIndex: string]: IAbyssParty[] }[]

export interface IAbyssParty {
  coreParty: string[],
  flex: IFlexChar[][]
  count: number,
  // avgStar: number,
  // winCount: number
}

export interface IParty {
  party: string[],
  count: number,
  // avgStar: number,
  // winCount: number
}

export interface IFlexChar {
  _id: string,
  count: number,
  // avgStar: number,
  // winCount: number
}

export interface IArtifactSetStats {
  _id: string
  weapons: {
    artifacts: IArtifactSet[]
  },
  characters: {
    [_id: string]: number
  },
  count: number
}

export interface IWeaponStats {
  _id: string
  characters: {
    [_id: string]: number
  },
  type_name: string,
  rarity: number,
  count: number
}

export interface ICharacterStats {
  _id: string,
  abyssCount: number,
  total: number
}