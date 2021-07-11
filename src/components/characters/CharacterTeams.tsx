import './Abyss.scss';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import { element } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { IAbyssBattle } from '../../data/types';
import { useAppSelector } from '../../hooks';
import CharacterTile from '../characters/CharacterTile';
import Dropdown, { Option } from '../ui/Dropdown';
import { ChevronDown, ChevronUp } from '../ui/Icons';

interface ITeam {
  party: string[],
  count: number
}

function Abyss({ abyssData, f2p }: { abyssData: IAbyssBattle[], f2p: boolean }) {
  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)

  const [ filteredTeams, setFilteredTeams ] = useState<ITeam[]>([])

  const _filterTeams = (data: IAbyssBattle[], charId: string) => {
    let filteredTeams: ITeam[] = [];
    
    _.reduce(data, function(sum, floor) {
      _.forEach(floor, (parties) => {
        console.log(parties)
      })
      return {}
    }, {})
    // _.forEach(data, floor => {
    //   floor.reduce((sum, obj) => {

    //   }, {})
    //   _.forEach(floor.party_stats, (battle, i) => {
    //     floor.party_stats[i] = _.filter(battle, ({party}) => {
    //       if (f2p) {
    //         let fivesCount =  characterDb[charId].rarity > 4 ? 1 : 0;
    //         return party.includes(charId) && _.filter(party, char => characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler").length === fivesCount;
    //       }

    //       return party.includes(charId)
    //     })
    //   })
    // })

    return filteredTeams;
  }

  useEffect(() => {
    setFilteredTeams(_filterTeams(abyssData, selectedCharacter));
  }, [setFilteredTeams, selectedCharacter, f2p])

  const renderParties = () => (
    <div className="floor-container">
      {_.map(filteredTeams, ({party, count}, i) => {
        return (
          <div key={`party-${i}`} className="party-container">
            <div className="party-grid">
              {_.map(_.sortBy(party, char => characterDb[char].name), (char, j) => {
                return <CharacterTile id={char+''} key={`party-${char}-${j}`} labeled={false} />
              })}
              <div className="party-popularity">
                {/* <p className="popularity-pct">{Math.round((count/(_.reduce(party_stats[0], (sum,curr) => sum + curr.count, 0)) * 10) / 10 * 100)}%</p> */}
                <p className="popularity-line">Count: {count}</p>
              </div>
            </div>
          </div>
        )})}
    </div>
  )

  return (
    <div className="abyss-container">
      <h1>Teams</h1>
      {renderParties()}
    </div>
  )
}

export default Abyss;