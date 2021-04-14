import React, { useState } from 'react'
import _ from 'lodash'
import Fuse from 'fuse.js'

import './Searchbar.css'

type SearchbarProps = {
  list: string[]
  onSearch: (filtered: string[]) => void
  maxResults: number
  placeholder: string
}

function Searchbar({ list, maxResults, onSearch, placeholder = "" }: SearchbarProps) {
  const [input, useInput] = useState("");
  const fuse = new Fuse(list, { threshold: 0.2 });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Controlled input
    e.preventDefault();
    const name = e.currentTarget.value;
    useInput(name);

    _.debounce(() => {
      let searchResults = fuse.search(name);

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
    }, 150)();
  }

  return (
    <div className="searchbar">
      <input placeholder={placeholder} list="search-input" name="search-input" onChange={handleInputChange} value={input} />
    </div>
  )
}

export default Searchbar
