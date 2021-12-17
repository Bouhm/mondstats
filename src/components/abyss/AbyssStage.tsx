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
  const isLoading = isEmpty(stageData)

  return (
    <>
      <h2 className="stage-label">Floor {floor}-{stage}</h2>
      {!isLoading &&
        <Tabs tabs={['1st Half', '2nd Half']} activeTabIdx={activeTabIdx} onChange={onTabChange} />
      }
      <div className="stage-half">
        {isLoading && <Loader />}
        {map(stageData, (battleData, i) => { 
          return (
            <React.Fragment key={`floor-${floor}-${stage}-${i}-${activeTabIdx}`}>
              <React.Fragment key={`parties-${floor}-${stage}-${i}-${activeTabIdx}`}>
                <h2>{reduce(battleData[activeTabIdx], (sum,curr) => sum + curr.count, 0)} Teams</h2>
                <div key={`battle-${floor}-${stage}-${i}-${activeTabIdx}`} className="battle-container">
                  {battleData[activeTabIdx].length > 0 ? 
                    <>
                      {map(take(orderBy(battleData[activeTabIdx], 'count', 'desc'), stageLimitToggle[`${floor}-${stage}`] ? maxParties : pageSize), ({coreParty, flex, battleCount, winCount, avgStar}, k) => {
                          const party = [...coreParty, flex[0][0].charId]
                          return (
                            <Team 
                              key={`team-${floor}-${stage}-${k}`} 
                              team={party} flex={flex} 
                              total={reduce(battleData[activeTabIdx], (sum, curr) => sum + curr.count, 0)} 
                              winCount={winCount} 
                              battleCount={battleCount} 
                              avgStar={avgStar} 
                            />
                          )
                        })
                      }
                    </>
                    :
                    <LLImage src={AmberSad} alt="empty" />
                  }
                </div>
              </React.Fragment>
              {some(battleData, parties => parties.length > pageSize) && (!stageLimitToggle[`${floor}-${stage}`] ?
                <Button className="stage-teams-show-more" onClick={() => onToggleLimit(`${floor}-${stage}`)}>Show more <ChevronDown size={20} /></Button>
                :
                <Button className="stage-teams-show-more" onClick={() => onToggleLimit(`${floor}-${stage}`)}>Show less <ChevronUp size={20} /></Button>
              )}
            </React.Fragment>
        )})}
      </div>
    </>
  )
}

export default AbyssStage;