import React, { useReducer } from 'react';

import { IArtifactDb, ICharacterDb, IData, IWeaponDb, newAbyss } from './data/types';

interface IState {
  characterIdMap: { [shortName: string]: string },
  data: IData,
  selectedCharacter: string,
  artifactDb:  { [id: string]: IArtifactDb },
  weaponDb: { [id: string]: IWeaponDb },
  characterDb:  { [id: string]: ICharacterDb }
}

export const initialState: IState = {
  characterIdMap: {},
  selectedCharacter: '',
  data: { characters: {}, abyss: newAbyss },
  artifactDb: {},
  weaponDb: {},
  characterDb: {}
}

export const Store = React.createContext<[IState, React.Dispatch<any>]>([initialState, () => { }])

export const StoreProvider = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={[state, dispatch]}>{props.children}</Store.Provider>
}

// REDUCERS
interface IAction {
  type: string
  payload?: any
}

export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'SET_CHARACTER_ID_MAP':
      return { ...state, characterIdMap: action.payload }
    case 'SELECT_CHARACTER':
      return { ...state, selectedCharacter: action.payload }
    case 'SET_DATA':
      return { ...state, data: action.payload }
    case 'SET_ARTIFACT_DB':
      return { ...state, artifactDb: action.payload }
    case 'SET_WEAPON_DB':
      return { ...state, weaponDb: action.payload }
    case 'SET_CHARACTER_DB':
      return { ...state, characterDb: action.payload }
    default:
      return state
  }
}