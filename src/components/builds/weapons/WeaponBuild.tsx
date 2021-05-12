import _ from "lodash";
import React, { useContext } from "react";
import { IBuild, IWeapon, IWeaponBuild } from "../../../data/types";
import { Store } from "../../../Store";
import WeaponCard from "./WeaponCard"

type WeaponBuild = {
  weapons: IWeaponBuild[]
  total: number
}

function WeaponBuild({ weapons, total }: WeaponBuild) {
  const [{ weaponDb, selectedCharacter, characterDb }] = useContext(Store)
  const getWeapon = (id: number) => _.find(weaponDb, { id });

  return (
    <div className="weapons-list">
      <h1>Weapons</h1>
      {_.map(_.orderBy(_.take(weapons, 8), 'count', 'desc'), ({ id, count }, i) => {
        const weapon = getWeapon(id);
        if (!weapon) return null;

        const popularity = Math.round((count / total) * 100);

        return (
          <div key={`${id}-${count}-${i}`} className="weapon-container">
            <WeaponCard {...weapon} popularity={popularity} />
            <div className="weapon-bar-chart">
              <div className={`weapon-bar ${characterDb[selectedCharacter].element.toLocaleLowerCase()}`} style={{ width: `${popularity}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeaponBuild