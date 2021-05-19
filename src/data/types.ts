export interface IData {
  characters: {
    [id: string]: IChar
  },
  abyss: IAbyss
}

export interface IChar {
  id: number,
  name: string,
  levels: {
    average: number,
    maxCount: number
  },
  constellations: number[],
  weapons: ICharWeapon[],
  artifacts: ICharArtifact[],
  total: number
}

export interface ICharWeapon {
  id: number,
  abyssClears: number,
  mains: number,
  weaponCount: {
    [buildId: string]: number
  }
}

export interface ICharArtifact {
  sets: IArtifactSet[],
  buildId: string,
  abyssClears: number,
  mains:number,
  count: number
}

export interface IArtifactSet {
  id: number,
  activation_number: number,
}

export interface IPlayerAbyss {
  floors: {
    index: number,
    levels: {
      index: number,
      star: number,
      max_star: number,
      battles: {
        index: number,
        timestamp: string,
        avatars: {
          id: number,
          icon: string,
          level: number,
          rarity: number
        }[]
      }[]
    }[]
  }[]
} 

export interface IAbyss {
  [floorNum: string]: IAbyssLevels
}

export interface IAbyssLevels {
  [stageNum: string]: [IAbyssData, IAbyssData]
}

type IAbyssData = {
  teams: { party: number[], count: number, abyssClears: number }[],
  count: number
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
