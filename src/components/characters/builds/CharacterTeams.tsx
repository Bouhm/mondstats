import './CharacterTeams.scss';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';

import { IAbyssBattle } from '../../data/types';
import { useAppSelector } from '../../hooks';
import CharacterTile from '../characters/CharacterTile';
import { ChevronDown, ChevronUp } from '../ui/Icons';

interface ITeam {
  party: string[],
  count: number
}

function Abyss({ abyssData, f2p }: { abyssData: IAbyssBattle[], f2p: boolean }) {
  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)

  const [ showMore, setShowMore ] = useState(false);
  const [ filteredTeams, setFilteredTeams ] = useState<ITeam[]>([])
  const [ totalTeams, setTotalTeams ] = useState(0);

  const _filterTeams = (data: IAbyssBattle[], charId: string) => {
    let filteredTeams: ITeam[] = [];
    
    _.forEach(data, floor => {
      _.forEach(floor.party_stats, (battle, i) => {
        _.forEach(floor.party_stats[i], ({ party }) => {
          if (f2p) {
            let fivesCount =  characterDb[charId].rarity > 4 ? 1 : 0;
            if (!(party.includes(charId) && _.filter(party, char => characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler").length === fivesCount)) {
              return;
            }
          } else {
            if (!party.includes(charId)) {
              return;
            }
          }

          const partyIdx = _.findIndex(filteredTeams, { party })
          if (partyIdx > -1) {
            filteredTeams[partyIdx].count++
          } else {
            filteredTeams.push({
              party,
              count: 1
            })
          }
        })
      })
    })

    return _.orderBy(filteredTeams, 'count', 'desc');
  }

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  }

  useEffect(() => {
    setFilteredTeams(_filterTeams(abyssData, selectedCharacter));
    setTotalTeams(_.reduce(filteredTeams, (sum,curr) => sum + curr.count, 0));
  }, [setFilteredTeams, setTotalTeams, selectedCharacter, f2p])

  const renderParties = () => (
    <div className="parties-container">
       <h2>Total: {totalTeams} {characterDb[selectedCharacter].name} Teams</h2>
      {_.map(_.take(filteredTeams, showMore ? 8 : 3), ({party, count}, i) => {
        return (
          <div key={`party-${i}`} className="party-container">
            <div className="party-grid">
              {_.map(_.sortBy(party, char => characterDb[char].name), (char, j) => {
                return <CharacterTile id={char+''} key={`party-${char}-${j}`} labeled={false} />
              })}
              <div className="party-popularity">
                <p className="popularity-pct">{Math.round((count/totalTeams) * 10) / 10 * 100}%</p>
                <p className="popularity-line">Count: {count}</p>
              </div>
            </div>
          </div>
        )})}
        {filteredTeams.length > 3 && (
          !showMore 
          ?
          <div className="party-show-more" onClick={handleToggleShowMore}>Show more <ChevronDown size={20} color={"#202020"} /></div>
          :
          <div className="party-show-more" onClick={handleToggleShowMore}>Show less <ChevronUp size={20} color={"#202020"} /></div>
        )}
    </div>
  )

  return (
    <div className="teams-container">
      <h1>Top Teams</h1>
      {renderParties()}
    </div>
  )
}

export default Abyss;