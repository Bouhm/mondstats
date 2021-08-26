import './Team.scss';

import { map } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { IFlexChar, IParty } from '../../data/types';
import { getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import Tooltip from '../ui/Tooltip';
import CharacterTile from './CharacterTile';
import useExpand from '../hooks/useExpand';
import CharacterCount from './CharacterCount';

type TeamProps = {
  team: string[],
  percent: string,
  count: number,
  flex: IFlexChar[]
}

function Team({ team, percent, count, flex }: TeamProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { expanded, handleExpand } = useExpand();

  return (
    <div className="team-container" onClick={handleExpand}>
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
      {expanded && map(flex, ({charId, count}) => <CharacterCount character={characterDb[charId]} count={count} />)}
    </div>
  )
}

export default Team;
