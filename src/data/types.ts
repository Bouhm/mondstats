export interface IData {
  characters: { [id: string]: ICharData }
  abyss: IAbyssData
}

export interface ICharData {
  id: number,
  name: string,
  avgLevel: number,
  constellations: number[],
  builds: IBuild[]
  total: number
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
  [floorNum: string]: IAbyssLevels
}

export interface IAbyssLevels {
  [stageNum: string]: [IBattle, IBattle]
}

type IBattle = {
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

export interface IArtifactDb {
  id: number, 
  name: string, 
  icon: string,
  pos: number,
  rarity: number, 
  set: {
    id: number,
    name: string,
    affixes: IAffix[]
  },
  pos_name: string
}

export interface IAffix { 
  activation_number: number,
  effect: string
}

export interface IWeaponDb {
  id: number,
  name: string,
  icon: string,
  type: number, 
  rarity: number,
  type_name: string,
  desc: string
}

export interface ICharacterDb {
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
    pos: number,
  }[],
}

export interface IArtifactSet {
  [id: string]: {
    count: number,
    affixes: IAffix[]
  }
}