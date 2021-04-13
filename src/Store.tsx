import React, { useReducer } from 'react'

interface IState {
  selectedChar: string,
  searchFilter: string[]
}

export const initialState: IState = {
  selectedChar: '',
  searchFilter: []
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
    case 'FILTER_CHARACTERS':
      return { ...state, selectedChar: action.payload }
    case 'RESET_FILTER':
      return { ...initialState, selectedChar: '' }
    case 'RESET_SELECTION':
      return { ...initialState, selectedChar: '' }
    default:
      return state
  }
}