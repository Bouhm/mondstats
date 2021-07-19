import _ from 'lodash';
import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import { IWeaponData } from '../../../data/types';

function WeaponCard({ oid, name, rarity, count, popularity }: IWeaponData & { count: number, popularity: number }) {
  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip();

  return (
    <div ref={setTriggerRef} className={`weapon-card`}>
      {visible && 
        <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
          {name}: {count}
        </div>
      }
      <img className={`rarity-${rarity}`} src={`/assets/weapons/${oid}.webp`} alt={name} />
      <div className="weapon-detail">
        <div className="weapon-name">
          {name}
        </div>
        <div className="weapon-popularity">
          <div className="weapon-popularity-pct">{popularity}%</div>
          {/* <div className="weapon-popularity-count">{count}></div> */}
        </div>
      </div>
    </div>
  )
}

export default WeaponCard