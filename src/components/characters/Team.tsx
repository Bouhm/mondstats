import './Team.scss';

import { isEmpty, map, take } from 'lodash';
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
  percent: string,
  count: number,
  flex?: IFlexChar[]
}

function Team({ team, percent, count, flex = [] }: TeamProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { expanded, handleExpand } = useExpand();

  const tooltipContent = flex.length > 1 ? `${take(map(team, char => characterDb[char].name), 3).join(', ')}, +${flex.length}: ${count}` : `${map(team, char => characterDb[char].name).join(', ')}: ${count}`

  return (
    <div className="team-container" onClick={handleExpand}>
      <Tooltip content={tooltipContent}>
        <div className={`team-stats ${flex.length > 1 ? 'asExpandable' : ''}`}>
          {map(team, (char, i) => (
            <CharacterTile key={`team-${char}-${i}`} id={char+''} labeled={false} clickable={false} />
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
