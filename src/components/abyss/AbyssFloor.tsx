import { some, map, filter, reduce, take, orderBy } from "lodash";
import Pagination from "rc-pagination";
import React from "react";
import { getPercentage } from "../../scripts/util";
import Team from "../characters/Team";
import usePaginate from "../hooks/usePaginate";
import Button from "../ui/Button";
import { ChevronDown, ChevronUp } from "../ui/Icons";
import LLImage from "../ui/LLImage";
import Loader from "../ui/Loader";
import AmberSad from '/assets/amberSad.webp';
import { Option } from '../ui/Dropdown';

type AbyssFloorProps = {
  abyssFloors: any,
  selectedStage: Option,
  stageLimitToggle: { [floor: string]: boolean }
  onToggleLimit: (stage: string) => void;
}

const AbyssFloor = ({ abyssFloors, selectedStage, stageLimitToggle, onToggleLimit }: AbyssFloorProps) => {
  const pageSize = 6;
  const maxParties = pageSize * 2;
  const { currentPage, onPageChange } = usePaginate(pageSize);  

  
  return (
    <>
      <h2 className="stage-label">Floor {selectedStage.label}</h2>
      <div className="stage-half">
        {!some(abyssFloors, { floor_level: selectedStage.value }) && <Loader />}
        {map(filter(abyssFloors, { floor_level: selectedStage.value }), ({battle_parties}, i) => (
          <React.Fragment key={`floor-${selectedStage.value}-${i}-${currentPage}`}>
            <React.Fragment key={`parties-${selectedStage.value}-${i}-${currentPage}`}>
              <h2>{reduce(battle_parties[currentPage-1], (sum,curr) => sum + curr.count, 0)} Teams</h2>
              <div key={`battle-${selectedStage.value}-${i}-${currentPage}`} className="battle-container">
                {battle_parties[currentPage-1].length > 1 ? 
                  <>
                    {map(take(orderBy(battle_parties[currentPage-1], 'count', 'desc'), stageLimitToggle[selectedStage.value] ? maxParties : pageSize), ({party, count}, k) => {
                        return (
                          <Team key={`team-${selectedStage.value}-${k}`} team={party} count={count} percent={`${getPercentage(count, reduce(battle_parties[currentPage-1], (sum,curr) => sum + curr.count, 0))}%`} />
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
        {some(abyssFloors, { floor_level: selectedStage.value }) &&
          <>
            <h2>{currentPage}{currentPage === 1 ? 'st' : 'nd'} Half</h2>
            <Pagination current={currentPage} pageSize={pageSize} onChange={onPageChange} total={maxParties} />
          </>
        }
      </div>
    </>
  )
}

export default AbyssFloor;