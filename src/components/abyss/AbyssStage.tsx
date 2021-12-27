import AmberSad from '/assets/amberSad.webp';
import { isEmpty, map, orderBy, reduce, some, take, values } from 'lodash';
import React, { Fragment } from 'react';
import Sticky from 'react-stickynode';

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
  const pageSize = 8;
  const maxParties = pageSize * 2;

  if (!stageData) {
    return <Loader />
  }

  return (
    <>
      <h2 className="stage-label">Floor {floor}-{stage}</h2>
      <div className="stage-teams">
        {map([stageData['1'], stageData['2']], (battle, battleIndex) => {
          return (
            <Fragment key={`battle-${floor}-${stage}-${battleIndex}`}>
              <div className="stage-half" >
                <h1>{`${battleIndex+1}${battleIndex === 0 ? 'st' : 'nd'}`} Half</h1>
                <h2>{reduce(battle, (sum, curr) => sum + curr.count, 0)} Teams</h2>
                <div className="battle-container">
                {battle.length > 0 ?
                  <>
                    {map(take(battle, stageLimitToggle[`${floor}-${stage}`] ? maxParties : pageSize), ({ coreParty, flex, count }, k) => {
                      const party = [...coreParty, flex[0][0]._id];
                      return (
                        <Team
                          key={`team-${floor}-${stage}-${k}`}
                          team={party} flex={flex}
                          total={reduce(battle, (sum, curr) => sum + curr.count, 0)}
                          count={count} />
                      );
                    })}
                  </>
                  :
                  <img src={AmberSad} alt="empty" />
                }
              </div>
            </div>
            {some(battle, parties => parties.length > pageSize) && (!stageLimitToggle[`${floor}-${stage}`] ?
              <Button className="stage-teams-show-more" onClick={() => onToggleLimit(`${floor}-${stage}`)}>Show more <ChevronDown size={20} /></Button>
              :
              <Button className="stage-teams-show-more" onClick={() => onToggleLimit(`${floor}-${stage}`)}>Show less <ChevronUp size={20} /></Button>
            )}
          </Fragment>)
        })}
      </div>
    </>
  )
}

export default AbyssStage;