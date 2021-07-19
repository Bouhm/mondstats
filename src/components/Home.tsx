import './Home.scss';

import Logo from '/assets/logo_m.webp';
import React from 'react';
import { useHistory } from 'react-router-dom';

import CharacterSearch from './characters/CharacterSearch';

function Home() {
  const routerHistory = useHistory();

  return (
    <div className="home">
      <CharacterSearch onSelect={(charName) => routerHistory.push(`/builds/${charName}`)} />
      <div className="home-logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="home-data-info">
        <div className="home-data-line-1">
          Data from <span className="home-data-number">13,783 </span> players
        </div>
        <div className="home-data-line-2">
          and <span className="home-data-number">179,354 </span> characters total
        </div>
      </div>
    </div>
  )
}

export default Home;