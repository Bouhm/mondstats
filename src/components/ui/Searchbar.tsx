import './Searchbar.css';

import Fuse from 'fuse.js';
import { debounce, filter, includes, map } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { SearchItem } from '../ui/CardSearch';
import { Search } from './Icons';

export const KEYWORDS = [
  "normal", 
  "charged",
  "elemental skill",
  "elemental burst",
  "elemental mastery",
  "energy recharge",
  "party",
  "anemo", 
  "pyro", 
  "hydro",
  "geo", 
  "electro", 
  "cryo", 
  "dendro", 
  "physical",
  "atk", 
  "def",
  "hp",
  "sword",
  "claymore",
  "bow",
  "catalyst",
  "polearm",
  "crit rate",
  "crit dmg",
  "shield",
  "dmg",
  "healing",
]

type SearchbarProps = {
  list: SearchItem[]
  onSearch: (filtered: SearchItem[]) => void
  maxResults?: number
  placeholder: string
  focused?: boolean
}

function Searchbar({ list, maxResults=99, onSearch, focused = false, placeholder = "" }: SearchbarProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [input, useInput] = useState("");
  const fuse = new Fuse(list, { threshold: 0.3, keys: [{name: 'name', weight: 1}, {name: 'keys', weight: 0.5}] });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Controlled input
    e.preventDefault();
    const query = e.currentTarget.value;
    useInput(query);

    debounce(() => {
      let searchResults = fuse.search(query);

      // Fuzzy search
      let filtered: string[] = [];

      if (searchResults.length > 0) {
        // Only filter up to maximum number of results
        const max = Math.min(maxResults, searchResults.length);
        for (let i = 0; i < max; i++) {
          filtered.push(searchResults[i].item.name)
        }
      }

      onSearch(filter(list, (item: SearchItem) => includes(filtered, item.name)));
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
