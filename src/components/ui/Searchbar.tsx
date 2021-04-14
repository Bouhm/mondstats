import React, { useState } from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'

import './Searchbar.css'

type SearchbarProps = {
  list: string[];
  onSearch: (filtered: string[]) => void;
  maxResults: number
}

function Searchbar({ list, maxResults, onSearch }: SearchbarProps) {
  const [input, useInput] = useState("");
  const fuse = new Fuse(list);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Controlled input
    e.preventDefault();
    const name = e.currentTarget.value;
    console.log(name)
    useInput(name);

    let searchResults = fuse.search(name);

    // If exact match, just that result
    if (searchResults.length && _.map(list, char => char.toLowerCase()).includes(name.toLowerCase())) {
      onSearch([searchResults[0].item]);
      return;
    }

    // Fuzzy search
    let filteredChars = [];

    if (searchResults.length > 0) {
      // Only filter up to maximum number of results
      const max = Math.min(maxResults, searchResults.length);
      for (let i = 0; i < max; i++) {
        filteredChars.push(searchResults[i].item)
      }
    }

    onSearch(filteredChars);
  }

  return (
    <div className="searchbar">
      <input list="search-input" name="search-input" onChange={handleInputChange} value={input} />
    </div>
  )
}

export default Searchbar
