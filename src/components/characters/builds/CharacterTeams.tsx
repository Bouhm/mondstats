import './CharacterTeams.scss';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { IParty } from '../../../data/types';
import useFilters, { Filters } from '../../filters/useFilters';
import { useAppSelector } from '../../hooks/useRedux';
import Button from '../../ui/Button';
import { ChevronDown, ChevronUp } from '../../ui/Icons';
import Team from '../Team';

interface ITeam {
  party: string[],
  count: number
}

function CharacterTeams({ teams, filters }: { teams: IParty[], filters: Filters }) {
  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  
  const max = 10;

  const [ showMore, setShowMore ] = useState(false);
  const [ filteredTeams, setFilteredTeams ] = useState<ITeam[]>([])

  const filterTeams = (teams: IParty[], charId: string) => {
    let filtered = teams;
    let max5WithChar = filters.max5;

    if (characterDb[selectedCharacter].rarity) {
      if (filters.max5 === 0) {
        max5WithChar++;
      }
    }

    filtered =_.filter(teams, ({ party }) => {
      if (filters.f2p) {
        return (_.filter(party, char => characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler").length <= max5WithChar)
      } else {
        return true
      }
    })

    _.forEach(filtered, ({party}, i) => filtered[i].party = [charId, ..._.filter(party, char => char !== charId)]);
    return _.take(filtered, max);
  }

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  }

  useEffect(() => {
    const updatedTeams = filterTeams(teams, selectedCharacter);
    setFilteredTeams(updatedTeams);
  }, [setFilteredTeams, selectedCharacter, filters])

  const renderParties = () => (
    <div className="parties-container">
       <h2>{_.reduce(filteredTeams, (sum,curr) => sum + curr.count, 0)} Teams</h2>
      {_.map(_.take(filteredTeams, showMore ? max : 5), ({party, count}, i) => (
        <Team key={`team-${i}`} team={party} count={count} percent={`${Math.round((count / _.reduce(filteredTeams, (sum,curr) => sum + curr.count, 0) * 1000)/10)}%`} />
      ))}
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
