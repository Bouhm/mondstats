import './CharacterTeams.scss';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IAbyssBattle, IParty } from '../../../data/types';
import { useAppSelector } from '../../../hooks';
import { getShortName } from '../../../scripts/util';
import CharacterTile from '../../characters/CharacterTile';
import Button from '../../ui/Button';
import { ChevronDown, ChevronUp } from '../../ui/Icons';

interface ITeam {
  party: string[],
  count: number
}

function CharacterTeams({ teams, f2p }: { teams: IParty[], f2p: boolean }) {
  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const max = 10;

  const [ showMore, setShowMore ] = useState(false);
  const [ filteredTeams, setFilteredTeams ] = useState<ITeam[]>([])
  const [ totalTeams, setTotalTeams ] = useState(0);

  const filterTeams = (teams: IParty[], charId: string) => {
    const filtered = _.take(_.filter(teams, ({ party }) => {
      if (f2p) {
        let fivesCount =  characterDb[charId].rarity > 4 ? 1 : 0;
        return (_.filter(party, char => characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler").length === fivesCount)
      }

      return true
    }), max);

    _.forEach(filtered, ({party}, i) => filtered[i].party = [charId, ..._.filter(party, char => char !== charId)]);
    return filtered;
  }

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  }

  useEffect(() => {
    const updatedTeams = filterTeams(teams, selectedCharacter);
    setFilteredTeams(updatedTeams);
    setTotalTeams(_.reduce(updatedTeams, (sum,curr) => sum + curr.count, 0));
  }, [setFilteredTeams, setTotalTeams, selectedCharacter, f2p])

  const renderParties = () => (
    <div className="parties-container">
       <h2>Total: {totalTeams} {characterDb[selectedCharacter].name} Teams</h2>
      {_.map(_.take(filteredTeams, showMore ? max : 5), ({party, count}, i) => {
        return (
          <div key={`party-${i}`} className="party-container">
            <div className="party-grid">
              {_.map(party, (char, j) => (
                <Link key={`party-${char}-${i}`} to={`/builds/${getShortName(characterDb[char].name)}`}>
                  <CharacterTile id={char+''} labeled={false} />
                </Link>
              ))}
              <div className="party-popularity">
                <p className="popularity-pct">{Math.round((count / totalTeams * 1000)/10)}%</p>
                <p className="popularity-line">Count: {count}</p>
              </div>
            </div>
          </div>
        )})}
        {filteredTeams.length > 5 && (
          !showMore 
          ?
          <Button className="party-show-more" onClick={handleToggleShowMore}>Show more <ChevronDown size={20} color={"#202020"} /></Button>
          :
          <Button className="party-show-more" onClick={handleToggleShowMore}>Show less <ChevronUp size={20} color={"#202020"} /></Button>
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

export default CharacterTeams;
