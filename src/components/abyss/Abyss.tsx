import './Abyss.scss';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import { element } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import AbyssBattles from '../../data/abyssBattles.json';
import { IAbyssBattle } from '../../data/types';
import { useAppSelector } from '../../hooks';
import CharacterTile from '../characters/CharacterTile';
import Dropdown, { Option } from '../ui/Dropdown';
import { ChevronDown, ChevronUp } from '../ui/Icons';

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
  const f2p = false;
  const options = _.map(AbyssBattles, stage => {
    return { label: stage.floor_level, value: stage.floor_level}
  }).sort(_compareFloor)

  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const defaultStages = options.slice(options.length-6)

  const [ stageLimitToggle, setStageLimitToggle ] = useState<{ [stage: string]: boolean }>({})
  const [ selectedStages, selectStages ] = useState<Option[]>(defaultStages)
  const [ filteredAbyss, setFilteredAbyss ] = useState<IAbyssBattle[]>(AbyssBattles)

  const getTopTeams = (data: IAbyssBattle[], charId: string) => {
    let filteredAbyss = _.cloneDeep(data)
    
    _.forEach(filteredAbyss, floor => {
      _.forEach(floor.party_stats, (battle, i) => {
        floor.party_stats[i] = _.filter(battle, ({party}) => {
          if (f2p) {
            let fivesCount =  characterDb[charId].rarity > 4 ? 1 : 0;
            return party.includes(charId) && _.filter(party, char => characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler").length === fivesCount;
          }

          return party.includes(charId)
        })
      })
    })

    return filteredAbyss;
  }

  useEffect(() => {
    setFilteredAbyss(getTopTeams(AbyssBattles));
  }, [setFilteredAbyss, selectedStages, f2p])

  const handleSelect = (selected: Option[]) => {
    selectStages(selected);
  }

  const handleToggleLimit = (selectedStage: string) => {
    let newMap: { [stage: string]: boolean } = _.clone(stageLimitToggle)
    newMap[selectedStage] = newMap[selectedStage] ? !newMap[selectedStage] : true;
    setStageLimitToggle(newMap)
  }

  const renderParties = () => (
    <div className="floor-container">
      {_.map(selectedStages.sort(_compareFloor), selectedStage => {
        return <div key={selectedStage.value} className="stage-container TEMP-SINGLE-COL">
          <h2 className="stage-label">Floor {selectedStage.label}</h2>
          <div className="stage-half TEMP-SINGLE-COL">
            {_.map(_.filter(filteredAbyss, { floor_level: selectedStage.value }), ({party_stats}, i) => {
              return <div className="stage-party" key={`${selectedStage.value}-${i}`}> 
              <>
                <h2>Total: {(_.reduce(party_stats[0], (sum,curr) => sum + curr.count, 0))} {characterDb[selectedCharacter].name} Teams</h2>
                {party_stats[0].length > 1 ? 
                  _.map(_.take(_.orderBy(party_stats[0], 'count', 'desc'), stageLimitToggle[selectedStage.value] ? 8 : 3), ({party, count}, j) => {
                    return (
                      <div key={`party-${selectedStage.value}-${i}-${j}`} className="party-container">
                        <div className="party-grid">
                          {_.map(_.sortBy(party, char => characterDb[char].name), (char, k) => {
                            return <CharacterTile id={char+''} key={`party-${char}-${k}`} labeled={false} />
                          })}
                          <div className="party-popularity">
                            <p className="popularity-pct">{Math.round((count/(_.reduce(party_stats[0], (sum,curr) => sum + curr.count, 0)) * 10) / 10 * 100)}%</p>
                            <p className="popularity-line">Count: {count}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                  :
                  <img className="emote-empty" src={AmberSad} alt="empty" />}
                  </>
                  {party_stats[0].length > 3 && (
                    !stageLimitToggle[selectedStage.value] ?
                    <div className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show more <ChevronDown size={20} color={"#202020"} /></div>
                    :
                    <div className="stage-teams-show-more" onClick={() => handleToggleLimit(selectedStage.value)}>Show less <ChevronUp size={20} color={"#202020"} /></div>
                  )}
                </div>
              // return _.map(party_stats, (parties, i) => {
              //   return (
              //     <div key={`battle-${i}`} className="battle-container">
              //       <h2>{i+1}{i+1 === 1 ? 'st' : 'nd'} Half</h2>
              //       {parties.length > 1 ? 
              //         <> 
              //           {_.map(_.take(_.orderBy(parties, 'count', 'desc'), stageLimitToggle[selectedStage] ? 8 : 3), ({party, count}, j) => {
              //               return (
              //                 <div key={`party-${i}-${j}`} className="party-container">
              //                   <div className="party-grid">
              //                     {_.map(_.sortBy(party, char => characterDb[char].name), (char, i) => {
              //                       return <CharacterTile id={char+''} key={`party-${i}`} />
              //                     })}
              //                   </div>
              //                   <div className="party-popularity withTooltip">
              //                     {Math.round((count/(_.reduce(parties, (sum,curr) => sum + curr.count, 0)) * 10) / 10 * 100)}%
              //                     <Tooltip 
              //                       content={`Party Count: ${count}`} 
              //                       alignment="top"
              //                     />
              //                   </div>
              //                 </div>
              //               )
              //             })
              //           }
              //         </>
              //         :
              //         <img src={AmberSad} alt="empty" />
              //       }
              //     </div>
              //   )
              // })
            })}
            </div>
        </div>
      })}
    </div>
  )

  return (
    <div className="abyss-container">
      <h1>Abyss Teams</h1>
      <Dropdown options={options} onChange={handleSelect} defaultValue={defaultStages} isMulti />
      <div className="abyss-disclaimer">{"* 1st & 2nd halves have been temporarily merged until there is more data."}</div>
      {renderParties()}
    </div>
  )
}

export default Abyss;