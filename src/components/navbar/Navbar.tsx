import React, { useContext, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import _ from 'lodash'
import Logo from '../../assets/logo_sm.png'

import "./Navbar.css"

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
  }, [navRef])

  return (
      <div ref={navRef} id="navbar">
        <div className="nav-logo">
          <Link to="/"><img src={Logo} alt="logo" /></Link>
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