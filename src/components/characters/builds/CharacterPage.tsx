  import './CharacterPage.css';

import { find, forEach, isEmpty, map, random, reduce, take, cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sticky from 'react-stickynode';

import { ElementColors } from '../../../data/constants';
import { ICharacterData } from '../../../data/types';
import { getCharacterFileName } from '../../../scripts/util';
import { selectCharacter } from '../../../Store';
import Filters from '../../filters/Filters';
import useApi from '../../hooks/useApi';
import useFilters from '../../hooks/useFilters';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Chart from '../../ui/Chart';
import Empty from '../../ui/Empty';
import Loader from '../../ui/Loader';
import BuildSelector from './BuildSelector';
import Constellations from './Constellations';
import data from './albedo.json';

interface ITotals { 
  total: number,
  abyssCount: number
}

function CharacterPage() {  
  const { shortName } = useParams<{ shortName: string }>();

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const maxBuilds = 10;
  const [elementColor, setElementColor] = useState("");
  const dispatch = useAppDispatch()

  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const {
    filters,
    handleFilterChange
  } = useFilters(['f2p','a6','max5']);

  const charId = characterIdMap[shortName]
  const _characterBuilds = useApi(`/characters/${shortName}.json`);
  const _characterMainBuilds = useApi(`/characters/mains/${shortName}.json`);
  const [characterBuilds, setCharacterBuilds] = useState(_characterBuilds)
  const [characterStats, setCharacterStats] = useState<any>({})
  // const _characterStats = useApi(`/characters/stats/top-characters.json`)
  // const _characterTotals = useApi(`/characters/stats/character-totals.json`)

  useEffect(() => {
    let newData: any = cloneDeep(data);
    newData.builds.forEach((build: any) => {
      build.count *= 12;  
      build.avgStar = 2 + Math.random();
      build.battleCount = build.count - random(10, Math.floor(build.count/10));
      build.winCount = build.battleCount - random(3, Math.floor(build.battleCount/10));    

      build.weapons.forEach((weapon: any) => {
        weapon.count *= 12;
        weapon.avgStar = 2 + Math.random();
        weapon.battleCount = weapon.count - random(10, Math.floor(weapon.count/10));
        weapon.winCount = weapon.battleCount - random(3, Math.floor(weapon.battleCount/10));    
      })
    })

    setCharacterBuilds(newData)
  }, [])

  useEffect(() => {
    if (!isEmpty(characterDb)) {
      const char = characterDb[charId];
      setCharacter(char)
      setElementColor(ElementColors[char.element.toLowerCase()]);
      
      dispatch(selectCharacter(charId))
    }
  }, [setCharacter, dispatch, charId, characterDb])

  // useEffect(() => {
  //   if (filters.a6.value) {
  //     setCharacterBuilds(_characterMainBuilds)
  //   } else {
  //     setCharacterBuilds(_characterBuilds)
  //   }
  // }, [_characterBuilds, _characterMainBuilds, filters])

  // useEffect(() => {
  //   if (_characterStats) {
  //     const charStats = find(_characterStats, { _id: charId });
  //     setCharacterStats(charStats)
  //   }
  // }, [_characterStats, charId])

  if (!characterDb || !characterIdMap || !character || !characterStats) {
    return <div>
      <Loader />
    </div>
  }

  if (!characterBuilds || !_characterMainBuilds || isEmpty(characterBuilds.builds) || isEmpty(_characterMainBuilds)) {
    return <Empty />
  }

  return (
    <>
      <div className="character-page-stats-count" style={{ backgroundColor: elementColor }}>
        <span>{characterBuilds.total} {character.name} Builds</span>
      </div>
      <div className="character-page">
        <div className="character-page-background" style={{ backgroundImage: `url("/assets/characters/${getCharacterFileName(character)}_bg.webp")` }} /> 
        {characterBuilds.builds &&
          <>
            <Sticky top={56}><Filters filters={filters} color={elementColor} onFilterChange={handleFilterChange} /></Sticky>
            <BuildSelector
              builds={take(characterBuilds.builds, maxBuilds)}
              total={characterBuilds.total}
              color={elementColor}
              filters={filters}
            /> 
            {character.rarity < 100 &&
              <Constellations constellations={characterBuilds.constellations} color={elementColor} total={reduce(characterBuilds.constellations, (sum, curr) => sum += curr, 0)} />
            }
          </>
        }
        <div className="character-stats-container">
          <div className="character-stats-chart">
            <Chart.Odometer
              data={[characterBuilds.abyssCount]}
              labels={['Abyss Battle Count']}
              colors={[elementColor, ElementColors.none]}
              showScale={false}
              semi={true} 
              max={characterBuilds.total}
            />
          </div>
          <div className="character-stats-chart">
            <Chart.Odometer
              data={[characterBuilds.winCount]}
              labels={['Win Count']}
              colors={[elementColor, ElementColors.none]}
              showScale={false}
              semi={true}
              max={characterBuilds.abyssCount}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterPage
