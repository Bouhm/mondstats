import './Home.scss';

import Logo from '/assets/logo_m.webp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { numberWithCommas } from '../scripts/util';
import Banner from './characters/Banner';
import useApi from './hooks/useApi';
import LLImage from './ui/LLImage';

interface IFeatured {
  player_total: number,
  character_total: number
}

function Home() {
  const routerHistory = useHistory();
  const featured = useApi(`/featured.json`);

  return (
    <div className="home">
      <div className="home-logo">
        <LLImage src={Logo} alt="logo" />
      </div>
      {featured && 
        <>
          <div className="home-data-info">
            <div className="home-data-line-1">
              Data from <span className="home-data-number">{numberWithCommas(featured.player_total)} </span> players
            </div>
            <div className="home-data-line-2">
              and <span className="home-data-number">{numberWithCommas(featured.character_total)} </span> characters total
            </div>
          </div>
          <div className="home-announcement">
            Updates are temporarily paused while undergoing data aggregation optimization.
            Thank you for your patience.
          </div>
          {/* <Banner characters={featured.banner} /> */}
        </>
      }
    </div>
  )
}

export default Home;