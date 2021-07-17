import './Searchbar.css';

import Fuse from 'fuse.js';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { Search } from './Icons';

type SearchbarProps = {
  list: string[]
  onSearch: (filtered: string[]) => void
  maxResults: number
  placeholder: string
  focused: boolean
}

function Searchbar({ list, maxResults, onSearch, focused = false, placeholder = "" }: SearchbarProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [input, useInput] = useState("");
  const fuse = new Fuse(list, { threshold: 0.3 });

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

  useEffect(() => {
    focused && searchRef.current && searchRef.current.focus();
  }, [focused, searchRef])

  return (
    <div className="searchbar">
      <Search className="search-icon" size={22} />
      <input ref={searchRef} placeholder={placeholder} list="search-input" name="search-input" onChange={handleInputChange} value={input} />
    </div>
  )
}

export default Searchbar
