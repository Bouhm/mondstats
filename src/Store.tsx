import React, { useReducer } from 'react'

export interface ICharData {
  name: string
  constellations: number[]
  weapons: { id: number, count: number }[]
  artifacts: { sets: { id: number, activation_number: number }[] }[],
}

interface IState {
  characterIdMap: { [name: string]: number }
  selectedChar: string,
  filteredChars: string[]
}

export const initialState: IState = {
  characterIdMap: {},
  selectedChar: '',
  filteredChars: []
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
      return { ...state, selectedChar: action.payload }
    case 'SET_FILTER':
      return { ...state, filteredChars: action.payload }
    case 'RESET_FILTER':
      return { ...initialState, selectedChar: '', filteredChars: [] }
    case 'RESET_SELECTION':
      return { ...initialState, selectedChar: '', filteredChars: [] }
    default:
      return state
  }
}