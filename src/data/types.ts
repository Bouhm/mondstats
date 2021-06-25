export interface ICharacterData {
  _id: string,
  id: number,
  name: string,
  rarity: number,
  element: string
  constellations: {
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
  id: number
  affixes: IAffix
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

export interface IArtifactBuild {
  id: number
  activation_number: number
}

export interface IWeaponBuild {
  id: number
  count: number
}

export interface IBuild {
  buildId: string,
  weapons: IWeaponBuild[]
  artifacts: IArtifactBuild[]
  count: number
}

export interface IAbyssData {
  [floorNum: string]: IAbyssFloor
}

export interface IAbyssFloor {
  [stageNum: string]: [IBattle, IBattle]
}

export type IBattle = {
  teams: { party: number[], count: number }[],
  total: number
}

export const newAbyss: IAbyssData = {
  "9": {
    "1": [{ teams: [], total: 0 }, { teams: [], total: 0 }],
    "2": [{ teams: [], total: 0 }, { teams: [], total: 0 }],
    "3": [{ teams: [], total: 0 }, { teams: [], total: 0 }]
  },
  "10": {
    "1": [{ teams: [], total: 0 }, { teams: [], total: 0 }],
    "2": [{ teams: [], total: 0 }, { teams: [], total: 0 }],
    "3": [{ teams: [], total: 0 }, { teams: [], total: 0 }]
  },
  "11": { 
    "1": [{ teams: [], total: 0 }, { teams: [], total: 0 }], 
    "2": [{ teams: [], total: 0 }, { teams: [], total: 0 }],
    "3": [{ teams: [], total: 0 }, { teams: [], total: 0 }]
  },
  "12": {
    "1": [{ teams: [], total: 0 }, { teams: [], total: 0 }],
    "2": [{ teams: [], total: 0 }, { teams: [], total: 0 }],
    "3": [{ teams: [], total: 0 }, { teams: [], total: 0 }]
  }
}

export interface IAffix { 
  activation_number: number,
  effect: string
}