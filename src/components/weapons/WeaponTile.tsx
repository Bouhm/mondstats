import './WeaponTile.css';

import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks';
import { getShortName } from '../../scripts/util';

export type CharacterTileProps = {
  id: string,
  labeled?: boolean
}

function WeaponTile({ id, labeled = true }: CharacterTileProps) {
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const weapon = weaponDb[id]

  if (!weapon) return null;

  let classes = "weapon-tile";
  classes += ` rarity-${weapon.rarity}`;

  const weaponName = getShortName(weapon.name);

  return (
    <Link to={`/weapons/${weaponName}`}>
      <div className="weapon-tile-container">
        <div className={classes}>
          <img src={`/assets/weapons/${weapon.oid}.png`} alt={`${weapon.name}-portrait`}></img>
          {labeled && <div className="weapon-tile-name">
            {weapon.name}
          </div>}
        </div>
      </div>
    </Link>
  )
}

export default WeaponTile
