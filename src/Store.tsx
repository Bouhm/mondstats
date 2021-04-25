import React, { useReducer } from 'react'
import { IArtifact, IWeapon, ICharacter, ICharData } from './data/types'

interface IState {
  characterIdMap: { [name: string]: number }
  searchedChars: string[]
  characterData: { [id: string]: ICharData }
  artifactDb: { [id: string]: IArtifact }
  weaponDb: { [id: string]: IWeapon }
  characterDb: { [id: string]: ICharacter }
}

export const initialState: IState = {
  characterIdMap: {},
  searchedChars: [],
  characterData: {},
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
    case 'SET_BUILD_DATA':
      return { ...state, characterData: action.payload }
    case 'SET_ARTIFACT_DB':
      return { ...state, artifactDb: action.payload }
    case 'SET_WEAPON_DB':
      return { ...state, weaponDb: action.payload }
    case 'SET_CHARACTER_DB':
      return { ...state, characterDb: action.payload }
    case 'SET_SEARCHED':
      return { ...state, searchedChars: action.payload }
    case 'RESET_SEARCHED':
      return { ...initialState, searchedChars: [] }
    default:
      return state
  }
}