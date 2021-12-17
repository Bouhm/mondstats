import './Team.scss';

import { filter, isEmpty, map, take } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import { IFlexChar, IParty } from '../../data/types';
import { getPercentage, getShortName } from '../../scripts/util';
import CharacterCount from '../characters/CharacterCount';
import CharacterTile from '../characters/CharacterTile';
import useExpand from '../hooks/useExpand';
import { useAppSelector } from '../hooks/useRedux';
import AbyssStat from '../stats/AbyssStat';
import UsagePct from '../stats/UsagePct';
import Divider from '../ui/Divider';
import { ChevronDown, ChevronUp, Exchange } from '../ui/Icons';
import Tooltip from '../ui/Tooltip';

type TeamProps = {
  team: string[],
  total: number,
  winCount: number,
  battleCount: number,
  avgStar: number,
  flex?: IFlexChar[][]
}

function Team({ team, winCount, battleCount, avgStar, total, flex = [] }: TeamProps) {
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const { expanded, handleExpand } = useExpand();

  return (
    <div className="team-container">
      <div className={`team-stats-container ${flex[0] && flex[0].length > 1 ? 'asExpandable' : ''}`} onClick={handleExpand}>
        {map(team, (char, i) => (
          <CharacterTile key={`team-${char}-${i}`} id={char+''} labeled={false} clickable={false} />
        ))}
        <div className="team-stats">
          <UsagePct count={battleCount} total={total} />
          <div className="team-abyss-stats-container">
            <AbyssStat label="Win Rate" value={`${getPercentage(winCount, battleCount)}%`} />
            <AbyssStat label="Avg Star" value={`★${avgStar.toFixed(2)}`} />
          </div>
        </div>
      </div>
      {flex[0] && flex[0].length > 1 && 
        <div className="team-flex-container">
            {expanded && <>
              {map(filter(flex, party => party.length > 1), (party, i) => (
                <div className="team-flex" key={`${team[0]}-${flex[0][0].charId}-${i}`}>
                  <CharacterCount character={characterDb[party[0].charId]} battleCount={party[0].battleCount} />
                  <Exchange size={22} />
                  <div className="team-flex-options">
                    {map(party.slice(1), (flex, i) => 
                      <div className="team-flex-stats-container">
                        <CharacterCount key={`${flex.charId}-${i}`} character={characterDb[flex.charId]} battleCount={flex.battleCount} />
                        <div className="team-flex-stats">
                          <UsagePct count={flex.battleCount} total={battleCount} size={'small'} />
                          {/* <AbyssStat label="Avg Star" value={`★${avgStar.toFixed(2)}`} />
                          <AbyssStat label="Win Rate" value={`${getPercentage(flex.winCount, flex.battleCount)}%`} /> */}
                        </div>
                      </div>
                    )}
                  </div>
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
