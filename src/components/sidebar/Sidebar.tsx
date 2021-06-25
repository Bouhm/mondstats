import './Navbar.css';

import Logo from '/assets/logo_sm.png';
import _ from 'lodash';
import React, { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const tabs: { name: string, linkto: string }[] = [
  // { name: "Weapons", linkto: "/builds" },
  // { name: "Spiral Abyss", linkto: "/builds" }
]

function Navbar() {
  return (
    <div id="sidebar">
      <div className="sidebar-menu">
        {_.map(tabs, tab => {
          return <Link key={tab.name} to={tab.linkto}><div className="sidebar-tab">{tab.name}</div></Link>
        })}
      </div>
    </div>
  )
}

export default Navbar;