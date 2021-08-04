import './CardSearch.scss';

import Fuse from 'fuse.js';
import { debounce, difference, filter, find, includes, map, orderBy, some, uniq, values } from 'lodash';
import { list } from 'postcss';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import Dropdown, { Option } from '../ui/Dropdown';
import Card from './Card';
import Searchbar from './Searchbar';

type ItemSearchProps = {
  items: string[]
}

export type SearchItem = {
  _id: string
  name: string,
  oid: number,
  rarity: number,
  keys?: string
}

type DDProps = {
  options: Option[], 
  OptionLabel: (o: Option)=>ReactNode 
}

function ArtifactSets(props: ItemSearchProps) { 
  const db = useAppSelector((state) => state.data.artifactSetDb)
  const options: Option[] = orderBy(map(props.items, (item) => {
    return { label: item.name, value: item.oid.toString() }
  }),'label', 'asc')

  const OptionLabel = ({ value, label }: Option) => {
    return (
      <div className="item-option" key={label}>
        <div className="item-option-image">
          <img className="item-option-portrait" src={`/assets/artifacts/${value}.webp`} alt={`${label}-portrait`} />
        </div>
        {/* <div className="item-option-label">{label}</div> */}
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} imgPath={"artifacts"} {...props} />
}

function Weapons(props: ItemSearchProps) { 
  const db = useAppSelector((state) => state.data.weaponDb)
  const options: Option[] = orderBy(map(props.items, (item) => {
    return { label: item.name, value: item.oid.toString() }
  }),'label', 'asc')

  const OptionLabel = ({ value, label }: Option) => {
    return (
      <div className="item-option" key={label}>
        <div className="item-option-image">
          <img className="item-option-portrait" src={`/assets/weapons/${value}.webp`} alt={`${label}-portrait`} />
        </div>
        {/* <div className="item-option-label">{label}</div> */}
      </div>
    ) as ReactNode;
  }

  return <CardSearch options={options} OptionLabel={OptionLabel} imgPath={"weapons"} {...props} />
}

function CardSearch({ items, imgPath, options, OptionLabel }: ItemSearchProps & DDProps & { imgPath: string }) { 
  const [filteredItems, setFilteredItems] = useState<SearchItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<SearchItem[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const maxResults = 10;
  const fuse = new Fuse(items, { threshold: 0.3, keys: [{name: 'name', weight: 1}, {name: 'keys', weight: 0.5}] });

  // Set character search filter
  const handleSearch = (filteredItems: SearchItem[]) => {
    setFilteredItems(filteredItems);    
  }

  const handleInput = (input: string) => {
    debounce(() => {
      let searchResults = fuse.search(input);

      // Fuzzy search
      let filtered: string[] = [];

      if (searchResults.length > 0) {
        // Only filter up to maximum number of results
        const max = Math.min(maxResults, searchResults.length);
        for (let i = 0; i < max; i++) {
          filtered.push(searchResults[i].item.name)
        }
      }

      handleSearch(filter(items, (item: SearchItem) => includes(filtered, item.name)));
    }, 150)();
  }

  const handleChange = (selected: Option[]) => {
    const selectedItem = find(items, { oid: selected.value });
    setSelectedItems(selected);
  }

  const handleSelect = (oid: number) => {
    const selectedItem = find(items, { oid: number });
    if (selectedItem) setSelectedItems([...selectedItems, ({ label: selectedItem.name, value: selectedItem.oid.toString() })])
  }

  useEffect(() => {
    setFilteredItems(uniq([...filteredItems, ...map(selectedItems)]))
  }, [selectedItems])
  
  return (
    <div className="cards-container">
      <div className="card-searchbar">
        <Dropdown.SearchSelect
          onChange={handleChange}
          onInput={handleInput}
          options={options}
          optionLabel={OptionLabel}
          showDropdown={false}
          isMulti={true}
          value={selectedItems}
        />
      </div>
      <div className="cards">
        {map(filteredItems, (item) => (
          <Card onClick={handleSelect} key={`filtered-${item._id}`} imgPath={imgPath} {...item} />
        ))}
        {map(orderBy(difference(items, filteredItems), 'name', 'desc'), (item) => (
          <Card onClick={handleSelect} key={item._id} imgPath={imgPath} {...item} faded={!!filteredItems.length} />
        ))}
      </div>
    </div>
  )
}

export default { ArtifactSets, Weapons }
