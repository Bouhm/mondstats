import './Team.scss';

import { filter, isEmpty, map, take } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { IFlexChar, IParty } from '../../data/types';
import { getPercentage, getShortName } from '../../scripts/util';
import useExpand from '../hooks/useExpand';
import { useAppSelector } from '../hooks/useRedux';
import Divider from '../ui/Divider';
import { ChevronDown, ChevronUp, Exchange } from '../ui/Icons';
import Tooltip from '../ui/Tooltip';
import CharacterCount from './CharacterCount';
import CharacterTile from './CharacterTile';

type TeamProps = {
  team: string[],
  percent: string,
  winCount: number,
  battleCount: number,
  avgStar: number,
  flex?: IFlexChar[][]
}

function Team({ team, winCount, battleCount, avgStar, percent, flex = [] }: TeamProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { expanded, handleExpand } = useExpand();
  let tooltipContent = ''

  return (
    <div className="team-container">
      <Tooltip content={''}>
        <div className={`team-stats ${flex[0] && flex[0].length > 1 ? 'asExpandable' : ''}`} onClick={handleExpand}>
          {map(team, (char, i) => (
            <CharacterTile key={`team-${char}-${i}`} id={char+''} labeled={false} clickable={false} />
          ))}
          <div className="team-popularity">
            <div className="team-popularity-pct">{percent}</div>
            <div className="team-abyss-stats-container">
              <div className="team-abyss-stats">
                <div className={`team-abyss-winCount`}>
                  <div className='team-abyss-stat-title'>Win Rate</div>
                  <div className='team-abyss-stat-value'>{getPercentage(winCount, battleCount)}%</div>
                </div>
              </div>
              <div className="team-abyss-stats">
                <div className={`team-abyss-avgStar`}>
                  <div className='team-abyss-stat-title'>Avg Star</div>
                  <div className='team-abyss-stat-value'>★{avgStar?.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tooltip>
      {flex[0] && flex[0].length > 1 && 
        <div className="team-flex-container">
            {expanded && <>
              {map(filter(flex, party => party.length > 1), (party, i) => (
                <div className="team-flex" key={`${team[0]}-${flex[0][0].charId}-${i}`}>
                  <CharacterCount character={characterDb[party[0].charId]} count={party[0].battleCount} />
                  <Exchange size={22} />
                  {map(party.slice(1), ({charId, battleCount}, i) => <CharacterCount key={`${charId}-${i}`} character={characterDb[charId]} battleCount={battleCount} />)}
                </div>
              ))}
            </>}
          <div className="team-expand" onClick={handleExpand}>
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </div>
        </div>
      }
    </div>
  )
}

export default Team;
