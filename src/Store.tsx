import React, { useReducer } from 'react';

import { IArtifactDb, ICharacterDb, IData, IWeaponDb, newAbyss } from './data/types';

// Didn't want to build out an API for handling more granular filtering of data
// Because then I'd have to deal with a real database with potentially a ton of entries
// Sticking to using static API with pre-filtered data in separate JSON files

interface IState {
  characterIdMap: { [shortName: string]: string },
  selectedCharacter: string,
  artifactDb:  { [id: string]: IArtifactDb },
  weaponDb: { [id: string]: IWeaponDb },
  characterDb:  { [id: string]: ICharacterDb },
  elementColor: string
}

export const initialState: IState = {
  characterIdMap: {},
  selectedCharacter: '',
  artifactDb: {},
  weaponDb: {},
  characterDb: {},
  elementColor: ""
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
    case 'SET_ARTIFACT_DB':
      return { ...state, artifactDb: action.payload }
    case 'SET_WEAPON_DB':
      return { ...state, weaponDb: action.payload }
    case 'SET_CHARACTER_DB':
      return { ...state, characterDb: action.payload }
    case 'SET_ELEMENT_COLOR':
      return { ...state, elementColor: action.payload }
    default:
      return state
  }
}