import './App.scss';
import 'react-popper-tooltip/dist/styles.css';
import 'rc-pagination/assets/index.css';

import axios from 'axios';
import { forEach, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';

// import { gql, useQuery } from '@apollo/client';
import Abyss from './components/abyss/Abyss';
import ArtifactSetTable from './components/artifact-sets/ArtifactSetTable';
import CharacterBuild from './components/characters/builds/CharacterBuild';
import BuildSearch from './components/characters/BuildSearch';
import CharacterTable from './components/characters/CharacterTable';
import Home from './components/Home';
import useApi from './components/hooks/useApi';
import { useAppDispatch, useAppSelector } from './components/hooks/useRedux';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import Changelog from './components/pages/Changelog';
import UnderConstruction from './components/pages/WIP';
import Sidebar from './components/sidebar/Sidebar';
import Dialogue from './components/ui/Dialogue';
import WeaponTable from './components/weapons/WeaponTable';
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
    Please also be mindful of other players' investment in the game which 
    may not be reflective of the objective value of a certain character or item.
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
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/changelog" component={Changelog} />
              <Route path="/abyss" component={Abyss} />
              <Route path="/characters" component={CharacterTable} />
              <Route path="/artifacts" component={ArtifactSetTable} />
              <Route path="/weapons" component={WeaponTable} />
              <Route path="/builds/:shortName" component={CharacterBuild} />
              <Route path="/builds" component={BuildSearch} />
            </Switch>
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

      <span className="build-ver">dev build 09.07.21</span>
    </div>
  )
}

export default withRouter(App)