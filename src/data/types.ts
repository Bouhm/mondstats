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
  teams: IParty[],
  total: number
}

export interface IWeaponBuild {
  _id: string,
  count: number
}

export interface IArtifactSet {
  _id: string,
  activation_number: number,
  rarity?: number
}

export interface IBuild {
  weapons: IWeaponBuild[],
  artifacts: IArtifactSet[]
  count: number
}

export interface IAbyssData {
  teams: IAbyssParty[],
  batttles: IAbyssBattle[]
}

export interface IAbyssBattle {
  floor_level: string,
  battle_parties: IAbyssParty[][]
}

export interface IAbyssParty {
  coreParty: string[],
  flex: IFlexChar[][]
  battleCount?: number,
  avgStar?: number,
  winCount?: number
}

export interface IParty {
  party: string[],
  count: number
}

export interface IFlexChar {
  charId: string,
  battleCount: number,
  avgStar: number,
  winCount: number
}

export interface IArtifactSetStats {
  _id: string
  weapons: {
    artifacts: IArtifactSet[]
  },
  characters: {
    [charId: string]: number
  },
  count: number
}

export interface IWeaponStats {
  _id: string
  characters: {
    [charId: string]: number
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