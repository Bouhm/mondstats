import './ItemSearch.css';

import { difference, filter, map, orderBy, values } from 'lodash';
import React, { ReactNode, useEffect, useState } from 'react';

import Searchbar, { ISearchItem } from '../ui/Searchbar';

type ItemSearchProps = {
  onSearch?: ()=>void,
  onSelect: ()=>void,
  items: ISearchItem[],
  tile: ItemTileProps
}

type ItemTileProps = {
  rarity: number,
  imgUrl: string,
  name: string
}

function ItemTile({ rarity, name, imgUrl, onClick }: ItemTileProps & { onClick: (name: string)=>void }) {
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

function ItemSearch({ onSearch, onSelect, items, tile }: ItemSearchProps) { 
  const [filteredItems, setFilteredItems] = useState<ISearchItem[]>([]);

  useEffect(() => {
    setFilteredItems(filteredItems)
  }, [setFilteredItems])

  // Set character search filter
  const handleSearchArtifactSet = (filteredItems: ISearchItem[]) => {
    setFilteredItems(filteredItems);    
  }

  const handleSelect = () => {
    onSelect();
  }
  
  return (
    <div className="item-stats-container">
      <div className="item-searchbar">
        <Searchbar maxResults={4} onSearch={handleSearchArtifactSet} list={items} placeholder="Search artifact sets&hellip;" />
      </div>
      <div className="item-tiles">
        <div className="searched-items">
          {map(filteredItems, ({_id, name}) => (
            <ItemTile onClick={handleSelect} key={_id} {...tile} />
          ))}
        </div>
        <div className="unfiltered-items">
          {map(orderBy(difference(items, filteredItems), 'name', 'desc'), ({_id, name}) => (
            <ItemTile onClick={handleSelect} key={_id} {...tile} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ItemSearch
