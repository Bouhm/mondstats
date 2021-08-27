import './Team.scss';

import { isEmpty, map } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { IFlexChar, IParty } from '../../data/types';
import { getShortName } from '../../scripts/util';
import useExpand from '../hooks/useExpand';
import { useAppSelector } from '../hooks/useRedux';
import { ChevronDown, ChevronUp, Exchange } from '../ui/Icons';
import Tooltip from '../ui/Tooltip';
import CharacterCount from './CharacterCount';
import CharacterTile from './CharacterTile';

type TeamProps = {
  team: string[],
  core?: string[],
  percent: string,
  count: number,
  flex?: IFlexChar[]
}

function Team({ team, percent, count, flex = [], core = [] }: TeamProps) {
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
      {flex.length > 1 && 
        <div className="team-flex-container">
            {expanded &&
              <div className="team-flex">
                <CharacterCount character={characterDb[flex[0].charId]} count={flex[0].count} />
                <Exchange size={22} />
                {map(flex.slice(1), ({charId, count}) => <CharacterCount character={characterDb[charId]} count={count} />)}
              </div>
          }
          <div className="team-expand">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      }
    </div>
  )
}

export default Team;
