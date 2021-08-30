import './CharacterTeams.scss';

import { filter, includes, map, reduce, sortBy, take } from 'lodash';
import React, { useEffect, useState } from 'react';

import { IParty } from '../../../data/types';
import { getPercentage } from '../../../scripts/util';
import { Filters } from '../../filters/useFilters';
import useExpand from '../../hooks/useExpand';
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
  const { expanded, handleExpand } = useExpand();
  const max = 10;

  const [ filteredTeams, setFilteredTeams ] = useState<ITeam[]>([])

  const filterTeams = (teams: IParty[], charId: string) => {
    let filtered = teams;
    let max5WithChar = filters.max5;

    if (characterDb[selectedCharacter].rarity === 5) {
      if (filters.max5 === 0) {
        max5WithChar++;
      }
    }

    filtered = filter(teams, ({ party }) => {
      if (party.length !== 4) return false;

      if (filters.f2p) {
        return (includes(party, charId) && filter(party, char => characterDb[char].rarity > 4 && characterDb[char].name !== "Traveler").length <= max5WithChar)
      } else {
        return includes(party, charId)
      }
    })

    // Bring selected character to the front
    filtered.forEach(({party}, i) => filtered[i].party = sortBy(party, (char: string) => char === charId ? 0 : 1))

    return take(filtered, max);
  }

  useEffect(() => {
    const updatedTeams = filterTeams(teams, selectedCharacter);
    setFilteredTeams(updatedTeams);
  }, [setFilteredTeams, selectedCharacter, filters])

  const renderParties = () => (
    <div className="parties-container">
       <h2>{reduce(filteredTeams, (sum, curr) => sum + curr.count, 0)} Teams</h2>
      {map(take(filteredTeams, expanded ? max : 5), ({party, count}, i) => (
        <Team key={`team-${i}`} team={party} count={count} percent={`${getPercentage(count, reduce(filteredTeams, (sum,curr) => sum + curr.count, 0))}%`} />
      ))}
      {filteredTeams.length > 5 && (
        !expanded 
        ?
        <Button className="party-show-more" onClick={handleExpand}>Show more <ChevronDown size={20} color={"#202020"} /></Button>
        :
        <Button className="party-show-more" onClick={handleExpand}>Show less <ChevronUp size={20} color={"#202020"} /></Button>
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
