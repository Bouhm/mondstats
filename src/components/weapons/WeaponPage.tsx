import { find, isEmpty, orderBy, reduce, take } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getShortName } from '../../scripts/util';
import { setColorClass } from '../../Store';
import Button from '../controls/Button';
import useApi from '../hooks/useApi';
import useExpand from '../hooks/useExpand';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import BuildCharts from '../stats/BuildCharts';
import UsageStats from '../stats/UsageStats';
import Empty from '../ui/Empty';
import HorizontalBarChart, { IBarChartData } from '../ui/HorizontalBarChart';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import Loader from '../ui/Loader';

function WeaponPage() { 
  const { shortName } = useParams();
  const weaponDb = useAppSelector((state) => state.data.weaponDb)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const weapon = find(weaponDb, weapon => getShortName(weapon) === shortName)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (weapon) {
      dispatch(setColorClass(weapon.type_name))
    }
  }, [weapon])
  
  if (!weapon) return null;

  const weaponStats = useApi(`/weapons/${weapon._id}.json`)
  const { expanded, handleExpand } = useExpand(window.innerWidth > 1036);
  const max = 10;
  
  if (!weaponStats) return <Empty />

  return (
    <div className="weapon-page">
      <UsageStats count={weaponStats.count} total={weaponStats.typeTotal} abyssCount={weaponStats.abyssCount} abyssTotal={weaponStats.abyssTypeTota} />
      <BuildCharts.Weapons stats={weaponStats} />
    </div>
  )
}

export default WeaponPage