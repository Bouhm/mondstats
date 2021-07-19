import './CharacterTeams.scss';

import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { IParty } from '../../data/types';
import { useAppSelector } from '../../hooks';
import { getShortName } from '../../scripts/util';
import CharacterTile from './CharacterTile';

type TeamProps = {
  team: string[],
  percent: string,
  count: number
}

function CharacterTeams({ team, percent, count }: TeamProps) {
  const selectedCharacter = useAppSelector((state) => state.data.selectedCharacter)
  const characterDb = useAppSelector((state) => state.data.characterDb)
 
  return (
    <div className="team-container">
      <div className="team-grid">
        {_.map(team, (char, i) => (
          <Link key={`team-${char}-${i}`} to={`/builds/${getShortName(characterDb[char].name)}`}>
            <CharacterTile id={char+''} labeled={false} />
          </Link>
        ))}
        <div className="team-popularity">
          <p className="team-popularity-pct">{percent}</p>
          <p className="team-popularity-count">Count: {count}</p>
        </div>
      </div>
    </div>
  )
}

export default CharacterTeams;
