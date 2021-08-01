import './ItemSearch.scss';

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
  imgUrl: string,
  name: string,
  rarity: number,
  keys: string
}

type ItemTileProps = { 
  onClick: (name: string)=>void,
  faded?: boolean 
} & SearchItem

function ItemTile({ _id, rarity, name, imgUrl, onClick, faded=false }: ItemTileProps) {
  let classes = "item-tile";
  classes += ` rarity-${rarity}`;

  if (faded) {
    classes += ' faded'
  }

  const handleClick = (name: string) => {
    onClick && onClick(name);
  }

  return (
    <div className={`item-tile-container`} onClick={() => handleClick(name)}>
      <div className={classes}>
        <div className="item-image">
          <img className="item-thumb" src={imgUrl} alt={`${name}-thumb`}></img>
          <div className="item-name">
            {name}
          </div>
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
        <Searchbar maxResults={6} onSearch={handleSearch} list={items} placeholder="Search artifact sets&hellip;" />
      </div>
      <div className="item-tiles">
        {map(filteredItems, (item) => (
          <ItemTile onClick={handleSelect} key={item._id} {...item} />
        ))}
        {map(orderBy(difference(items, filteredItems), 'name', 'desc'), (item) => (
          <ItemTile onClick={handleSelect} key={item._id} {...item} faded={!!filteredItems.length} />
        ))}
      </div>
    </div>
  )
}

export default ItemSearch
