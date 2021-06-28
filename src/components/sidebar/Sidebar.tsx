import './Sidebar.css';

import _ from 'lodash';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

interface ITab {
  name: string
  linkto: string
  icon: string
}

const tabs: ITab[] = [
  { name: "Spiral Abyss", linkto: "/abyss", icon: "spiralAbyss.png" },
  { name: "Characters", linkto: "/characters", icon: "characters.png" },
  { name: "Artifacts", linkto: "/artifacts", icon: "artifacts.png" },
  { name: "Weapons", linkto: "/weapons", icon: "weapons.png" }
]

function Sidebar() {
  return (
    <div id="sidebar">
      <div className="sidebar-menu">
        {_.map(tabs, tab => {
          return <Link key={tab.name} to={tab.linkto}>
            <div className="sidebar-tab">
              <img src={`/assets/icons/${tab.icon}`} />
              {tab.name}
            </div>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Sidebar;