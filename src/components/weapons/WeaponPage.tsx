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
  const { shortName } = useParams<{ shortName: string }>();
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const allWeaponStats = useApi(`/weapons/weapon-stats.json`)
  const { expanded, handleExpand } = useExpand(window.innerWidth > 1036);
  const weapon = find(weaponDb, weapon => getShortName(weapon) === shortName)
  const weaponStats = find(allWeaponStats, { _id: weapon!._id });

  if (!weapon || !weaponStats) return null;
 
  const charsTotal = reduce(weaponStats.characters, (sum, curr) => sum + curr.count, 0)
  const max = 10;
  
  console.log(weaponStats)

  if (isEmpty(weaponDb) || isEmpty(weaponStats)) return <Loader />

  return (
    <div className="weapon-page">
      <div className="weapon-characters">
        <h1>Characters</h1>
        <HorizontalBarChart data={take(orderBy(weaponStats.characters, 'count', 'desc'), expanded ? max : 5) as unknown as IBarChartData[]} db={characterDb} total={charsTotal} color={''} />
        <br />
        {weaponStats.length > 5 && (
          <Button className="weapons-show-more" onClick={handleExpand}>
            {!expanded ? <>Show more <ChevronDown size={20} color={"#202020"} /></> : <>Show less <ChevronUp size={20} color={"#202020"} /></>}
          </Button>
        )}
      </div>
      <div className="weapon-detail">

      </div>
    </div>
  )
}

export default WeaponPage