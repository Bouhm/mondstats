import './WeaponPage.css';

import { find, isEmpty, orderBy, reduce, take } from 'lodash';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { getShortName } from '../../scripts/util';
import Button from '../controls/Button';
import useApi from '../hooks/useApi';
import useExpand from '../hooks/useExpand';
import { useAppSelector } from '../hooks/useRedux';
import HorizontalBarChart, { IBarChartData } from '../ui/HorizontalBarChart';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import Loader from '../ui/Loader';

function WeaponPage() { 
  const { shortName } = useParams();
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const allWeaponStats = useApi(`/weapons/weapon-stats.json`)
  const { expanded, handleExpand } = useExpand(window.innerWidth > 1036);
  const weapon = find(weaponDb, weapon => getShortName(weapon) === shortName)
  const max = 10;

  if (!weapon) return null;
 
  const weaponStats = find(allWeaponStats, { _id: weapon!._id });

  if (!weaponStats || isEmpty(weaponDb) || isEmpty(weaponStats)) return <Loader />

  const charsTotal = reduce(weaponStats.characters, (sum, curr) => sum + curr.count, 0)
  
  return (
    <div className="weapon-page">
      <div className="weapon-characters">
        <h1>Characters</h1>
        <HorizontalBarChart data={take(orderBy(weaponStats.characters, 'count', 'desc'), expanded ? max : 5) as unknown as IBarChartData[]} db={characterDb} path='characters' total={charsTotal} color={''} />
        <br />
        {weaponStats.characters > 5 && (
          <Button className="weapons-show-more" onClick={handleExpand}>
            {!expanded ? <>Show more <ChevronDown size={20}/></> : <>Show less <ChevronUp size={20} /></>}
          </Button>
        )}
      </div>
      <div className="weapon-detail">
        <h1>Weapon</h1>
        <div className="weapon-info-container">
          <div className="weapon-info">
            <img src={`/assets/weapons/${weapon._id}.webp`} />
            <div className="weapon-info-stats">
              <div className="weapon-info-stat-title">Base Atk:</div>
              <div className="weapon-info-stat-value">{weapon.baseAtk}</div>
              <div className="weapon-info-stat-title">{weapon.subStat}:</div>
              <div className="weapon-info-stat-value">{weapon.subValue}</div>
            </div>
          </div>
          <div className="weapon-info-effect">{weapon.effect}</div>
        </div>
      </div>
    </div>
  )
}

export default WeaponPage