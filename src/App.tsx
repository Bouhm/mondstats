import './App.scss';
import 'react-popper-tooltip/dist/styles.css';
import 'rc-pagination/assets/index.css';

import axios from 'axios';
import { forEach, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

// import { gql, useQuery } from '@apollo/client';
import AbyssPage from './components/abyss/AbyssPage';
import ArtifactSetIndex from './components/artifact-sets/ArtifactSetIndex';
import ArtifactSetPage from './components/artifact-sets/ArtifactSetPage';
import CharacterPage from './components/characters/builds/CharacterPage';
import BuildSearch from './components/characters/BuildSearch';
import CharacterIndex from './components/characters/CharacterIndex';
import Home from './components/Home';
import useApi from './components/hooks/useApi';
import { useAppDispatch, useAppSelector } from './components/hooks/useRedux';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import Changelog from './components/pages/Changelog';
import UnderConstruction from './components/pages/WIP';
import Sidebar from './components/sidebar/Sidebar';
import Dialogue from './components/ui/Dialogue';
import WeaponIndex from './components/weapons/WeaponIndex';
import WeaponPage from './components/weapons/WeaponPage';
import {
  IArtifactData,
  IArtifactDb,
  IArtifactSetData,
  IArtifactSetDb,
  ICharacterData,
  ICharacterDb,
  IWeaponData,
  IWeaponDb,
} from './data/types';
import { getShortName } from './scripts/util';
import { setArtifactDb, setArtifactSetDb, setCharacterDb, setCharacterIdMap, setWeaponDb } from './Store';

function App() {
  const dispatch = useAppDispatch()
  const [showNotice, setShowNotice] = useState(false)
  // const { loading, error, data } = useQuery(Query);
  const db = useApi(`/db.json`);
  const notice = <p>
    This site shows the most <i>used</i> builds and teams which don't necessarily mean the <i>best</i>.
    <br/><br />
    Please also be mindful of other players' spending in the game 
    which may not reflect the objective value of a character or item.
  </p>

  useEffect(() => {
    if (db) {
      let charIdMap: { [shortname: string]: string } = {}
      let characterDb: ICharacterDb = {}
      let weaponDb: IWeaponDb = {}
      let artifactDb: IArtifactDb = {}
      let artifactSetDb: IArtifactSetDb = {}
  
      forEach(db.characters, (character: ICharacterData) => {
        characterDb[character._id] = character;
  
        charIdMap[getShortName(character)] = character._id;
      })
  
      forEach(db.weapons, (weapon: IWeaponData) => {
        weaponDb[weapon._id] = weapon
      })
  
      forEach(db.artifacts, (artifact: IArtifactData) => {
        artifactDb[artifact._id] = artifact
      })
  
      forEach(db.artifactSets, (set: IArtifactSetData) => {
        artifactSetDb[set._id] = set
      })
  
      dispatch(setArtifactDb(artifactDb))
      dispatch(setArtifactSetDb(artifactSetDb))
      dispatch(setCharacterDb(characterDb))
      dispatch(setCharacterIdMap(charIdMap))
      dispatch(setWeaponDb(weaponDb))
    }
  }, [db])

  return (
    <div className="App">
      <main className="App-content">
        {showNotice && 
          <Dialogue onClose={() => setShowNotice(false)}>
            {notice}
          </Dialogue>
        }
        <Sidebar />
        <div className="section-view" style={showNotice ? {filter: 'blur(3px)'} : {}}  >
          <main>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/changelog" element={<Changelog/>} />
              <Route path="/abyss" element={<AbyssPage/>} />
              <Route path="/characters/:shortName" element={<CharacterPage/>} />
              <Route path="/characters" element={<CharacterIndex/>} />
              <Route path="/artifacts/:shortName" element={<ArtifactSetPage/>} />
              <Route path="/artifacts" element={<ArtifactSetIndex/>} />
              <Route path="/weapons/:shortName" element={<WeaponPage/>} />
              <Route path="/weapons" element={<WeaponIndex/>} />
            </Routes>
          </main>
          <section className="footer">
            <div className="links">
              <Link to="/about">About</Link>
              <Link to="/changelog">Changelog</Link>
              <div className="notice" onClick={() => setShowNotice(true)}>⚠️</div>
            </div>
            <footer>Genshin Impact is a registered trademark of miHoYo Co., Ltd. Mondstats is not affiliated or in any way officially connected with miHoYo.</footer>
          </section>
        </div>
      </main>
      <Navbar />

      <span className="build-ver">dev build 10.10.21</span>
    </div>
  )
}

export default App