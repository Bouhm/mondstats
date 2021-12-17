import AmberSad from '/assets/amberSad.webp';
import { isEmpty, map, orderBy, reduce, some, take, values } from 'lodash';
import React from 'react';

import { getPercentage } from '../../scripts/util';
import Button from '../controls/Button';
import { Option } from '../controls/Dropdown';
import { useTabs } from '../hooks/useTabs';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import LLImage from '../ui/LLImage';
import Loader from '../ui/Loader';
import Tabs from '../ui/Tabs';
import Team from './Team';

type AbyssFloorProps = {
  stageData: any,
  floor: string | number,
  stage: number,
  stageLimitToggle: { [floor: string]: boolean }
  onToggleLimit: (stage: string) => void;
}

const AbyssStage = ({ stageData, stageLimitToggle, floor, stage, onToggleLimit }: AbyssFloorProps) => {
  const pageSize = 6;
  const maxParties = pageSize * 2;
  const { activeTabIdx, onTabChange } = useTabs();

  if (!stageData) {
    return <Loader />
  }

  return (
    <>
      <h2 className="stage-label">Floor {floor}-{stage}</h2>
      <Tabs tabs={['1st Half', '2nd Half']} activeTabIdx={activeTabIdx} onChange={onTabChange} />
      <div className="stage-half">
        <h2>{reduce(stageData[activeTabIdx+1], (sum,curr) => sum + curr.battleCount, 0)} Teams</h2>
        <div key={`battle-${floor}-${stage}-${activeTabIdx+1}`} className="battle-container">
          {stageData[activeTabIdx+1].length > 0 ? 
            <>
              {map(take(stageData[activeTabIdx+1], stageLimitToggle[`${floor}-${stage}`] ? maxParties : pageSize), ({coreParty, flex, battleCount, winCount, avgStar}, k) => {
                  const party = [...coreParty, flex[0][0].charId]
                  return (
                    <Team 
                      key={`team-${floor}-${stage}-${k}`} 
                      team={party} flex={flex} 
                      total={reduce(stageData[activeTabIdx+1], (sum, curr) => sum + curr.battleCount, 0)} 
                      winCount={winCount} 
                      battleCount={battleCount} 
                      avgStar={avgStar} 
                    />
                  )
                })
              }
            </>
            :
            <img src={AmberSad} alt="empty" />
          }
        </div>
        {some(stageData[activeTabIdx+1], parties => parties.length > pageSize) && (!stageLimitToggle[`${floor}-${stage}`] ?
          <Button className="stage-teams-show-more" onClick={() => onToggleLimit(`${floor}-${stage}`)}>Show more <ChevronDown size={20} /></Button>
          :
          <Button className="stage-teams-show-more" onClick={() => onToggleLimit(`${floor}-${stage}`)}>Show less <ChevronUp size={20} /></Button>
        )}
      </div>
    </>
  )
}

export default AbyssStage;