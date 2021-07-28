import './App.scss';
import 'react-popper-tooltip/dist/styles.css';
import './components/ui/PopperTooltip.scss';

import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';

// import { gql, useQuery } from '@apollo/client';
import Abyss from './components/abyss/Abyss';
import CharacterBuilds from './components/characters/builds/CharacterBuilds';
import CharacterSearch from './components/characters/CharacterSearch';
import Home from './components/Home';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import Changelog from './components/pages/Changelog';
import UnderConstruction from './components/pages/WIP';
import Sidebar from './components/sidebar/Sidebar';
// import Dialogue from './components/ui/Dialogue';
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
import { useAppDispatch, useAppSelector } from './useRedux';

function App() {
  const dispatch = useAppDispatch()
  const [CharacterJson, setCharacterJson] = useState<ICharacterData[]>();
  const [WeaponJson, setWeaponJson] = useState<IWeaponData[]>();
  const [ArtifactJson, setArtifactJson] = useState<IArtifactData[]>();
  const [ArtifactSetJson, setArtifactSetJson] = useState<IArtifactSetData[]>();

  // const { loading, error, data } = useQuery(Query);

  useEffect(() => {
    fetch(`https://api.github.com/repos/bouhm/favonius-server/contents/data/db.json`, {
      headers: {
        authorization: `token ${import.meta.env.VITE_GH_PAT}`,
        'accept': 'application/vnd.github.v3.raw+json'
      },
    })
      .then(res => res.json())
      .then(data => {
        setCharacterJson(data.characters)
        setArtifactJson(data.artifacts)
        setArtifactSetJson(data.artifactSets)
        setWeaponJson(data.weapons)
      })
  }, [setCharacterJson, setArtifactJson, setWeaponJson, setArtifactSetJson])

  useEffect(() => {
    let charIdMap: { [shortname: string]: string } = {}
    let characterDb: ICharacterDb = {}
    let weaponDb: IWeaponDb = {}
    let artifactDb: IArtifactDb = {}
    let artifactSetDb: IArtifactSetDb = {}

    _.forEach(CharacterJson, (character: ICharacterData) => {
      characterDb[character._id] = character;

      charIdMap[getShortName(character)] = character._id;
    })

    _.forEach(WeaponJson, (weapon: IWeaponData) => {
      weaponDb[weapon._id] = weapon
    })

    _.forEach(ArtifactJson, (artifact: IArtifactData) => {
      artifactDb[artifact._id] = artifact
    })

    _.forEach(ArtifactSetJson, (set: IArtifactSetData) => {
      artifactSetDb[set._id] = set
    })

    dispatch(setArtifactDb(artifactDb))
    dispatch(setArtifactSetDb(artifactSetDb))
    dispatch(setCharacterDb(characterDb))
    dispatch(setCharacterIdMap(charIdMap))
    dispatch(setWeaponDb(weaponDb))
  }, [CharacterJson, ArtifactJson, ArtifactSetJson, WeaponJson,  getShortName, dispatch])

  return (
    <div className="App">
      <Navbar />
      <main className="App-content">
        <Sidebar />
        <div className="section-view">
          <main>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/changelog" component={Changelog} />
              <Route path="/abyss" component={Abyss} />
              <Route path="/artifacts" component={UnderConstruction} />
              <Route path="/weapons" component={UnderConstruction} />
              <Route exact path="/" component={Home} />
              <Route path="/builds/:shortName" component={CharacterBuilds} />
              <Redirect exact path="/builds" to="/" />
            </Switch>
          </main>
          <section className="footer">
            <div className="links">
              <Link to="/about">About</Link>
              <Link to="/changelog">Changelog</Link>
            </div>
            <footer>Favonius.io is not affiliated, associated, authorized, endorsed by, or in any way officially connected with miHoYo.</footer>
          </section>
        </div>
      </main>
      <span className="build-ver">dev build 07.21.21</span>
    </div>
  )
}

export default App