import React, { ChangeEvent, useState, useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'

import './Searchbar.css'

type SearchbarProps = {
  list: string[];
}

function Searchbar({ list }: SearchbarProps) {
  const [input, useInput] = useState("");
  const [state, dispatch] = useContext(Store)
  console.log(list);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.currentTarget.value;
    useInput(name);

    if (list.includes(name)) dispatch({ type: 'SELECT_CHARACTER', payload: name })
  }

  return (
    <div className="searchbar">
      <input list="search-input" name="search-input" onChange={handleInputChange} value={input} />
    </div>
  )
}

export default Searchbar
