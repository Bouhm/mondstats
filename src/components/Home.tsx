import './Home.scss';

import Logo from '/assets/logo_m.webp';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { numberWithCommas } from '../scripts/util';
import Button from './controls/Button';
import useApi from './hooks/useApi';
import StatsTable from './stats/StatsTable';
import LLImage from './ui/LLImage';
import Loader from './ui/Loader';

interface IFeatured {
  player_total: number,
  character_total: number
}

function Home() {
  const topCharacters = useApi(`/characters/stats/top-characters.json`)
  const topArtifactSetBuilds = useApi(`/artifactSets/stats/top-artifact-set-builds.json`)
  const topWeapons = useApi(`/weapons/stats/top-weapons.json`)
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (topCharacters && topArtifactSetBuilds && topWeapons) {
      setIsLoading(false)
    }
  }, [topCharacters, topArtifactSetBuilds, topWeapons])

  if (isLoading) return <Loader />
    
  return (
    <div className="home">
      <div className="home-logo">
        <LLImage src={Logo} alt="logo" />
      </div>
      <div style={{color: 'white', textAlign: 'center'}}>
        MONDSTATS IS UPDATED AFTER A HUGE DATA REWORK <br />
        THIS IS STILL HEAVILY WIP -- EXPECT MISSING DATA <br />
      </div>
      <div className="home-top-charts">
        <div className="home-top-chart">
          <StatsTable.Characters data={topCharacters} isPreview={true} />
        </div>
        <div className="home-top-chart">
          <StatsTable.ArtifactSetBuilds data={topArtifactSetBuilds} isPreview={true} />
        </div>
        <div className="home-top-chart">
          <StatsTable.Weapons data={topWeapons} isPreview={true} />
        </div>
      </div>
      <div>
        <Button onClick={() => navigate('/charts')}><>Show All</></Button>
      </div>
    </div>
  )
}

export default Home;