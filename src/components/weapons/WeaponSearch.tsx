import './WeaponSearch.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks';
import Searchbar from '../ui/Searchbar';
import WeaponTile from './WeaponTile';

function WeaponSearch() {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const [unfilteredWeapons, setUnfilteredWeapons] = useState<string[]>([]);
  const [filteredWeapons, setFilteredWeapons] = useState<string[]>([]);
  const weaponNames = _.map(_.values(weaponDb), weapon => weapon.name);

  useEffect(() => {
    setUnfilteredWeapons(weaponNames)
  }, [weaponDb, setUnfilteredWeapons])

  // Set weapon search filter
  const handleSearchCharacter = (filteredWeapons: string[]) => {
    setFilteredWeapons(filteredWeapons);
    setUnfilteredWeapons(_.filter(weaponNames, name => !filteredWeapons.includes(name)));
  }

  return (
    <div className="weapon-search">
      <div className="weapon-searchbar">
        <Searchbar maxResults={6} onSearch={handleSearchCharacter} list={weaponNames} placeholder="Search weapons" />
      </div>
      <div className="weapon-tiles">
        <div className="searched-weapon-grid">
          <div className="searched-weapon">
            {_.map(filteredWeapons, weaponName => (
              <WeaponTile key={weaponName} id={_.find(weaponDb, { name: weaponName })!._id} />
            ))}
          </div>
        </div>
        <div className="unfiltered-characters">
          {_.map(unfilteredWeapons.sort(), weaponName => (
            <WeaponTile key={weaponName} id={_.find(weaponDb, { name: weaponName })!._id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeaponSearch;