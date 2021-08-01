import './CardSearch.scss';

import { difference, filter, map, orderBy, values } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';

import Card from './Card';
import Searchbar from './Searchbar';

type ItemSearchProps = {
  onSearch?: ()=>void,
  onSelect: ()=>void,
  items: SearchItem[]
}

export type SearchItem = {
  _id: string
  imgUrl: string,
  name: string,
  rarity: number,
  keys?: string
}

function CardSearch({ onSearch, onSelect, items }: ItemSearchProps) { 
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);

  useEffect(() => {
    setFilteredItems(filteredItems)
  }, [setFilteredItems])

  // Set character search filter
  const handleSearch = (filteredItems: SearchItem[]) => {
    setFilteredItems(filteredItems);    
  }

  const handleSelect = () => {
    onSelect();
  }
  
  return (
    <div className="cards-container">
      <div className="card-searchbar">
        <Searchbar onSearch={handleSearch} list={items} placeholder="Search artifact sets&hellip;" />
      </div>
      <div className="cards">
        {map(filteredItems, (item) => (
          <Card onClick={handleSelect} key={item._id} {...item} />
        ))}
        {map(orderBy(difference(items, filteredItems), 'name', 'desc'), (item) => (
          <Card onClick={handleSelect} key={item._id} {...item} faded={!!filteredItems.length} />
        ))}
      </div>
    </div>
  )
}

export default CardSearch
