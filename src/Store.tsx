import React, { useReducer } from 'react'

export interface ICharData {
  name: string
  constellations: number[]
  weapons: { id: number, count: number }[]
  artifacts: { sets: { id: number, activation_number: number }[] }[],
}

interface IState {
  characterIdMap: { [name: string]: number }
  filteredChars: string[]
  buildData: { [id: string]: ICharData }
}

export const initialState: IState = {
  characterIdMap: {},
  filteredChars: [],
  buildData: {}
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
      return { ...state, buildData: action.payload }
    case 'SET_FILTER':
      return { ...state, filteredChars: action.payload }
    case 'RESET_FILTER':
      return { ...initialState, filteredChars: [] }
    default:
      return state
  }
}