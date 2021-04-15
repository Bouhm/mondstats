import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import _ from 'lodash'
import Logo from '../../assets/logo_sm.png'

import "./Navbar.css"

const Navtabs = [
  { name: "Builds", linkto: "" }
]

function Navbar() {
  return (
    <Router>
      <div className="navbar">
        <div className="nav-logo">
          <Link to="/"><img src={Logo} alt="logo" /></Link>
        </div>
        <div className="nav-menu">
          {_.map(Navtabs, tab => {
            return <Link key={tab.name} to="/builds"><div className="nav-tab">{tab.name}</div></Link>
          })}
        </div>
      </div>
    </Router>
  )
}

export default Navbar;