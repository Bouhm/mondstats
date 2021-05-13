import './Navbar.css';

import _ from 'lodash';
import React, { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Logo from '../../assets/logo_sm.png';

const Navtabs: { name: string, linkto: string }[] = [
  // { name: "Builds", linkto: "/builds" }
]

function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    document.addEventListener('scroll', function (e) {
      if (navRef.current) {
        if (window.scrollY === 0) {
          navRef.current!.classList.remove("invis")
        } else {
          navRef.current!.classList.add("invis")
        }
      }
    })
  }, [])

  return (
      <div ref={navRef} id="navbar">
        <div className="nav-logo">
          <Link to="/"><img src={Logo} alt="logo" /></Link>
        </div>
        <div className="nav-announcement">
          NOT OPTIMIZED AT ALL DEV DEMO SUPER WIP 
        </div>
        <div className="nav-menu">
          {_.map(Navtabs, tab => {
            return <Link key={tab.name} to={tab.linkto}><div className="nav-tab">{tab.name}</div></Link>
          })}
        </div>
      </div>
  )
}

export default Navbar;