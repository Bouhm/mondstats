import React, { useReducer } from 'react'

interface IState {
  selectedChar: string,
  filteredChars: string[]
}

export const initialState: IState = {
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
    case 'SELECT_CHARACTER':
      return { ...state, selectedChar: action.payload }
    case 'SET_FILTER':
      console.log("dispatch payload ", action.payload);
      return { ...state, filteredChars: action.payload }
    case 'RESET_FILTER':
      return { ...initialState, filteredChars: [] }
    case 'RESET_SELECTION':
      return { ...initialState, selectedChar: '' }
    default:
      return state
  }
}