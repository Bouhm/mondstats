import './Abyss.scss';

import AmberSad from '/assets/amberSad.webp';
import _, {
  clone,
  cloneDeep,
  countBy,
  difference,
  filter,
  forEach,
  includes,
  isEmpty,
  map,
  orderBy,
  reduce,
  some,
  take,
} from 'lodash';
import React, { useEffect, useState } from 'react';

import AbyssData from '../../data/abyssData.json';
import { IAbyssBattle } from '../../data/types';
import { useAppSelector } from '../../hooks';
import Team from '../characters/Team';
import F2P from '../filters/F2P';
import Button from '../ui/Button';
import Dropdown, { Option } from '../ui/Dropdown';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import PartySelector from './PartySelector';

const _compareFloor = (f1: Option, f2: Option) => {
  const f1Strs = f1.value.split("-")
  const f2Strs = f2.value.split("-")

  if (parseInt(f1Strs[0]) === parseInt(f2Strs[0])) {
    return parseInt(f1Strs[1]) - parseInt(f2Strs[1])
  } else {
    return parseInt(f1Strs[0]) - parseInt(f2Strs[0])
  }
}

function Abyss() {
  const options = map(AbyssData.abyss, stage => {
    return { label: stage.floor_level, value: stage.floor_level}
  }).sort(_compareFloor)

  const characterDb = useAppSelector((state) => state.data.characterDb)
  const defaultStages = filter(options, option => includes(["12-1", "12-2", "12-3"], option.value));

  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const [ selectedStages, selectStages ] = useState<Option[]>(defaultStages)
  const [ filteredAbyss, setFilteredAbyss ] = useState<IAbyssBattle[]>(AbyssData.abyss)
  const [ characters, setCharacters ] = useState<string[]>([]);
  const [ max5, setMax5 ] = useState(-1);

  useEffect(() => {
    setFilteredAbyss(_filterAbyss(AbyssData.abyss));
  }, [setFilteredAbyss, characters, selectedStages, max5])

  function _filterAbyss(data: IAbyssBattle[]) {
    let filteredAbyss = cloneDeep(data)
  
    let max5WithChar = max5;

    forEach(characters, character => {
      if (characterDb[character].rarity) {
        if (max5 === 0) {
          max5WithChar++;
        }
      }
    })

    forEach(filteredAbyss, floor => {
      forEach(floor.battle_parties, (battle, i) => {
        floor.battle_parties[i] = filter(battle, ({party}) => {
          let charFilter = true;

          if (max5 > -1) {
            charFilter = (filter(party, char => characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler").length <= max5WithChar)
          } 
          
          return charFilter && difference(characters, party).length === 0
        })
      })
    })
  
    return filteredAbyss;
  }

  const handleSelect = (selected: Option[]) => {
    selectStages(selected);
  }

  const handleToggleLimit = (selectedStage: string) => {
    let newMap: { [stage: string]: boolean } = clone(stageLimitToggle)
    newMap[selectedStage] = newMap[selectedStage] ? !newMap[selectedStage] : true;
    setStageLimitToggle(newMap)
  }

  const handleFilterChange = (val: number) => {
    setMax5(val)
  }

  const handlePartyChange = (party: string[]) => {
    setCharacters(party)
    const count5 = countBy(party, char => characterDb[char].rarity);

    if (max5 > -1) {
      if (count5['5'] > max5) {
      console.log(count5, max5)

        setMax5(count5['5'])
      }
    }
  }

  const renderParties = () => (
    <div className="floor-container">
      {map(selectedStages.sort(_compareFloor), selectedStage => {
        return (
          <div key={selectedStage.value} className="stage-container">
          <h2 className="stage-label">Floor {selectedStage.label}</h2>
          <div className="stage-half">
            {map(filter(filteredAbyss, { floor_level: selectedStage.value }), ({battle_parties}) => (
              <React.Fragment key={`floor-${selectedStage.value}`}>
                {map([battle_parties[0]], (parties) => (
                  <React.Fragment key={`parties-${selectedStage.value}`}>
                    <h2>{reduce(parties, (sum,curr) => sum + curr.count, 0)} Teams</h2>
                    <div key={`battle-${selectedStage.value}}`} className="battle-container">
                      {/* <h2>{i+1}{i+1 === 1 ? 'st' : 'nd'} Half</h2> */}
                      {parties.length > 1 ? 
                        <>
                          {map(take(orderBy(parties, 'count', 'desc'), stageLimitToggle[selectedStage.value] ? 10 : 5), ({party, count}, i) => {
                              return (
                                <Team key={`team-${selectedStage.value}-${i}`} team={party} count={count} percent={`${Math.round((count / reduce(parties, (sum,curr) => sum + curr.count, 0) * 1000)/10)}%`} />
                              )
                            })
                          }
                        </>
                        :
                        <img src={AmberSad} alt="empty" />
                      }
                    </div>
                  </React.Fragment>
                ))}
                {some(battle_parties, parties => parties.length > 5) && (!stageLimitToggle[selectedStage.value] ?
                  <Button className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show more <ChevronDown size={20} color={"#202020"} /></Button>
                  :
                  <Button className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show less <ChevronUp size={20} color={"#202020"} /></Button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        )
      })}
    </div>
  )

  return (
    <div className="abyss-container">
      <div className="abyss-controls">
        <F2P onChange={handleFilterChange} value={max5} />
      </div>
      <PartySelector onPartyChange={handlePartyChange} />
      <br />
      <h1>Abyss Teams</h1>
      <Dropdown.MultiSelect options={options} onChange={handleSelect} defaultValue={defaultStages} isMulti={true} />
      <div className="abyss-disclaimer">{"* 1st & 2nd halves have been temporarily merged until there is more data."}</div>
      {!isEmpty(characterDb) && renderParties()}
    </div>
  )
}

export default Abyss;