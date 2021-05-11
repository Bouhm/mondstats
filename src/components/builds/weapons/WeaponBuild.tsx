import _ from "lodash";
import React from "react";
import { IBuild, IWeapon } from "../../../data/types";
import WeaponCard from "./WeaponCard"

type WeaponBuild = {
  build: IBuild,
  element: string,
  getWeapon(id: number): IWeapon | undefined
}

function WeaponBuild({ build, element, getWeapon }: WeaponBuild) {
  return (
    <div className="weapons-list">
      <h1>Weapons</h1>
      {_.map(_.orderBy(_.take(build.weapons, 8), 'count', 'desc'), ({ id, count }, i) => {
        const weapon = getWeapon(id);
        if (!weapon) return null;

        const popularity = Math.round((count / build.count) * 100);

        return (
          <div key={`${id}-${count}-${i}`} className="weapon-container">
            <WeaponCard {...weapon} popularity={popularity} />
            <div className="weapon-bar-chart">
              <div className={`weapon-bar ${element}`} style={{ width: `${popularity}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeaponBuild