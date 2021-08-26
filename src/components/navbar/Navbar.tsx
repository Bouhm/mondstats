import './Navbar.css';

import Logo from '/assets/logo_sm.webp';
import _ from 'lodash';
import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';

import LLImage from '../ui/LLImage';

const Navtabs: { name: string, linkto: string }[] = [
  // { name: "Weapons", linkto: "/builds" },
  // { name: "Spiral Abyss", linkto: "/builds" }
]

function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // document.addEventListener('scroll', () => {
    //   if (navRef.current) {
    //     if (window.scrollY === 0) {
    //       navRef.current!.classList.remove("invis")
    //     } else {
    //       navRef.current!.classList.add("invis")
    //     }
    //   }
    // })
  }, [navRef])

  return (
      <div id="navbar" ref={navRef}>
        <div className="nav-logo">
          <Link to="/"><LLImage src={Logo} alt="logo" /></Link>
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