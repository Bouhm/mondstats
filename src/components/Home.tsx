import './Home.scss';

import Logo from '/assets/logo_m.webp';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { numberWithCommas } from '../scripts/util';
import CharacterSearch from './characters/CharacterSearch';

interface IFeatured {
  player_total: number,
  character_total: number
}

function Home() {
  const routerHistory = useHistory();
  const [featured, setFeatured] = useState<IFeatured|undefined>(undefined)

  useEffect(() => {
    fetch(`https://api.github.com/repos/bouhm/favonius-data/contents/featured.json`, {
      headers: {'accept': 'application/vnd.github.v3.raw+json'},
    })
      .then(res => res.json())
      .then(data => setFeatured(data))
  }, [setFeatured])
  
  return (
    <div className="home">
      <CharacterSearch onSelect={(charName) => routerHistory.push(`/builds/${charName}`)} />
      <div className="home-logo">
        <img src={Logo} alt="logo" />
      </div>
      {featured &&
        <div className="home-data-info">
          <div className="home-data-line-1">
            Data from <span className="home-data-number">{numberWithCommas(featured.player_total)} </span> players
          </div>
          <div className="home-data-line-2">
            and <span className="home-data-number">{numberWithCommas(featured.character_total)} </span> characters total
          </div>
        </div>
      }
    </div>
  )
}

export default Home;