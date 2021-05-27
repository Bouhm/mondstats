import './Navbar.css';

import Logo from '/assets/logo_sm.png';
import _ from 'lodash';
import React, { useContext, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Navtabs: { name: string, linkto: string }[] = [
  { name: "Changelog", linkto: "/changelog" },
  // { name: "Weapons", linkto: "/builds" },
  // { name: "Spiral Abyss", linkto: "/builds" }
]

function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (navRef.current) {
        if (window.scrollY === 0) {
          navRef.current!.classList.remove("invis")
        } else {
          navRef.current!.classList.add("invis")
        }
      }
    })
  }, [navRef])

  return (
      <div ref={navRef} id="navbar">
        <div className="nav-logo">
          <Link to="/"><img src={Logo} alt="logo" /></Link>
        </div>
        <div className="nav-announcement">
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