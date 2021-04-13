import React, { ChangeEvent, useState } from 'react'
import _ from 'lodash'
import './Searchbar.css'

type SearchbarProps = {
  list: string[];
}

function Searchbar({ list }: SearchbarProps) {
  const [input, useInput] = useState("");
  console.log(list);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    useInput(e.currentTarget.value);
  }

  return (
    <div className="searchbar">
      <input list="search-input" name="search-input" onChange={handleInputChange} value={input} />
      <datalist id="search-input">
        {_.map(list, item => <option key={item} value={item} />)}
      </datalist>
    </div>
  )
}

export default Searchbar
