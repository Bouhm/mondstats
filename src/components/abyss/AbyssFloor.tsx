import AmberSad from '/assets/amberSad.webp';
import { isEmpty, map, orderBy, reduce, some, take } from 'lodash';
import React from 'react';

import { getPercentage } from '../../scripts/util';
import Team from '../characters/Team';
import Button from '../ui/Button';
import { Option } from '../ui/Dropdown';
import { ChevronDown, ChevronUp } from '../ui/Icons';
import LLImage from '../ui/LLImage';
import Loader from '../ui/Loader';
import Tabs, { useTabs } from '../ui/Tabs';

type AbyssFloorProps = {
  abyssFloors: any,
  selectedStage: Option,
  stageLimitToggle: { [floor: string]: boolean }
  onToggleLimit: (stage: string) => void;
}

const AbyssFloor = ({ abyssFloors, selectedStage, stageLimitToggle, onToggleLimit }: AbyssFloorProps) => {
  const pageSize = 6;
  const maxParties = pageSize * 2;
  const { activeTabIdx, onTabChange } = useTabs();
  const isLoading = isEmpty(abyssFloors )

  return (
    <>
      <h2 className="stage-label">Floor {selectedStage.label}</h2>
      {!isLoading &&
        <Tabs tabs={['1st Half', '2nd Half']} activeTabIdx={activeTabIdx} onChange={onTabChange} />
      }
      <div className="stage-half">
        {isLoading && <Loader />}
        {map(abyssFloors, ({battle_parties}, i) => (
          <React.Fragment key={`floor-${selectedStage.value}-${i}-${activeTabIdx}`}>
            <React.Fragment key={`parties-${selectedStage.value}-${i}-${activeTabIdx}`}>
              <h2>{reduce(battle_parties[activeTabIdx], (sum,curr) => sum + curr.count, 0)} Teams</h2>
              <div key={`battle-${selectedStage.value}-${i}-${activeTabIdx}`} className="battle-container">
                {battle_parties[activeTabIdx].length > 0 ? 
                  <>
                    {map(take(orderBy(battle_parties[activeTabIdx], 'count', 'desc'), stageLimitToggle[selectedStage.value] ? maxParties : pageSize), ({party, count}, k) => {
                        return (
                          <Team key={`team-${selectedStage.value}-${k}`} team={party} count={count} percent={`${getPercentage(count, reduce(battle_parties[activeTabIdx], (sum,curr) => sum + curr.count, 0))}%`} />
                        )
                      })
                    }
                  </>
                  :
                  <LLImage src={AmberSad} alt="empty" />
                }
              </div>
            </React.Fragment>
            {some(battle_parties, parties => parties.length > pageSize) && (!stageLimitToggle[selectedStage.value] ?
              <Button className="stage-teams-show-more" onClick={() => onToggleLimit(selectedStage.value)}>Show more <ChevronDown size={20} color={"#202020"} /></Button>
              :
              <Button className="stage-teams-show-more" onClick={() => onToggleLimit(selectedStage.value)}>Show less <ChevronUp size={20} color={"#202020"} /></Button>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  )
}

export default AbyssFloor;