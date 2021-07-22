import './Team.scss';

import _ from 'lodash';
import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
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
  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  return (
    <div className="team-container">
      <div className="team-stats" ref={setTriggerRef}>
        {_.map(team, (char, i) => (
          <Link key={`team-${char}-${i}`} to={`/builds/${getShortName(characterDb[char].name)}`}>
            <CharacterTile id={char+''} labeled={false} />
          </Link>
        ))}
        {visible && 
          <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
            {_.map(team, char => characterDb[char].name).join(', ')}: {count}
          </div>
        }
        <div className="team-popularity">
          <div className="team-popularity-pct">{percent}</div>
          {/* <div className="team-popularity-count">{count}</div> */}
        </div>
      </div>
    </div>
  )
}

export default CharacterTeams;
