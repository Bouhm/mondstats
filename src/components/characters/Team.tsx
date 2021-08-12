import './Team.scss';

import { map } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { IParty } from '../../data/types';
import { getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import Tooltip from '../ui/Tooltip';
import CharacterTile from './CharacterTile';

type TeamProps = {
  team: string[],
  percent: string,
  count: number
}

function Team({ team, percent, count }: TeamProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)

  return (
    <div className="team-container">
      <Tooltip content={`${map(team, char => characterDb[char].name).join(', ')}: ${count}`}>
        <div className="team-stats">
          {map(team, (char, i) => (
            <Link key={`team-${char}-${i}`} to={`/builds/${getShortName(characterDb[char])}`}>
              <CharacterTile id={char+''} labeled={false} />
            </Link>
          ))}
          <div className="team-popularity">
            <div className="team-popularity-pct">{percent}</div>
            {/* <div className="team-popularity-count">{count}</div> */}
          </div>
        </div>
      </Tooltip>
    </div>
  )
}

export default Team;
