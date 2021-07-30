import './ItemSearch.scss';
import './ItemTile.scss';

import { difference, filter, map, orderBy, values } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';

import Searchbar from '../ui/Searchbar';

type ItemSearchProps = {
  onSearch?: ()=>void,
  onSelect: ()=>void,
  items: SearchItem[]
}

export type SearchItem = {
  _id: string
  rarity: number,
  imgUrl: string,
  name: string
}

function ItemTile({ _id, rarity, name, imgUrl, onClick }: SearchItem & { onClick: (name: string)=>void }) {
  let classes = "item-tile";
  classes += ` rarity-${rarity}`;

  const handleClick = (name: string) => {
    onClick && onClick(name);
  }

  return (
    <div className={`item-tile-container`} onClick={() => handleClick(name)}>
      <div className={classes}>
        <div className="item-image">
          <img className="item-thumb" src={imgUrl} alt={`${name}-thumb`}></img>
        </div>
      </div>
    </div>
  )
}

function ItemSearch({ onSearch, onSelect, items }: ItemSearchProps) { 
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
    <div className="items-container">
      <div className="item-searchbar">
        <Searchbar maxResults={4} onSearch={handleSearch} list={items} placeholder="Search artifact sets&hellip;" />
      </div>
      <div className="item-tiles">
        <div className="searched-items">
          {map(filteredItems, (item) => (
            <ItemTile onClick={handleSelect} key={item._id} {...item} />
          ))}
        </div>
        <div className="unfiltered-items">
          {map(orderBy(difference(items, filteredItems), 'name', 'desc'), (item) => (
            <ItemTile onClick={handleSelect} key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ItemSearch
