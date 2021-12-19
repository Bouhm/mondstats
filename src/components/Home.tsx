import './Home.scss';

import Logo from '/assets/logo_m.webp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { numberWithCommas } from '../scripts/util';
import useApi from './hooks/useApi';
import LLImage from './ui/LLImage';

interface IFeatured {
  player_total: number,
  character_total: number
}

function Home() {
  const featured = useApi(`/featured.json`);

  return (
    <div className="home">
      <div className="home-logo">
        <LLImage src={Logo} alt="logo" />
      </div>
      <div style={{color: 'white', textAlign: 'center'}}>
        HEAVILY WIP BUILD WITH VERY ROUGH EDGES <br />
        NOT REPRESENTATIVE OF THE FINAL PRODUCT <br />
        PLEASE EXCUSE THE JANK <br />
        THANK
      </div>
    </div>
  )
}

export default Home;