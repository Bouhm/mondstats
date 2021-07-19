import './Sidebar.css';

import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Hamburger } from '../ui/Icons';

interface ITab {
  name: string
  linkto: string
  icon: string
}

const tabs: ITab[] = [
  { name: "Spiral Abyss", linkto: "/abyss", icon: "spiralAbyss.png" },
  // { name: "Characters", linkto: "/characters", icon: "characters.png" },
  // { name: "Artifacts", linkto: "/artifacts", icon: "artifacts.png" },
  // { name: "Weapons", linkto: "/weapons", icon: "weapons.png" }
]

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleBurgerClick = () => {
    setIsOpen(!isOpen)  
  }

  const renderMenu = () => {
    return (
      <div className="sidebar-menu">
        {_.map(tabs, tab => {
          return <Link key={tab.name} to={tab.linkto}>
            <div className="sidebar-tab" onClick={() => setIsOpen(false)}>
              <img src={`/assets/icons/${tab.icon}`} />
              <span className="tab-name">{tab.name}</span>
            </div>
          </Link>
        })}
      </div>
    )
  }

  return (
    <>
     <div className="sidebar-collapsible">
        <div className="sidebar-menu-burger" onClick={handleBurgerClick}>
          <Hamburger size={30} />
        </div>
        {isOpen && renderMenu()}
      </div>
      <div className="sidebar">
       {renderMenu()}
      </div>
    </>
  )
}

export default Sidebar;