import './App.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';

import Abyss from './components/abyss/Abyss';
import CharacterBuilds from './components/characters/builds/CharacterBuilds';
import CharacterSearch from './components/characters/CharacterSearch';
import Navbar from './components/navbar/Navbar';
import About from './components/pages/About';
import Changelog from './components/pages/Changelog';
import UnderConstruction from './components/pages/WIP';
import Sidebar from './components/sidebar/Sidebar';
import Dialogue from './components/ui/Dialogue';
import ArtifactDb from './data/artifacts.json';
import ArtifactSetDb from './data/artifactSets.json';
import CharacterDb from './data/characters.json';
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
import WeaponDb from './data/weapons.json';
import { useAppDispatch, useAppSelector } from './hooks';
import { getShortName } from './scripts/util';
import { setArtifactDb, setArtifactSetDb, setCharacterDb, setCharacterIdMap, setWeaponDb } from './Store';

function App() {
  const dispatch = useAppDispatch()

  const dialogueWidthLimit = 1078;
  const [seenDialogue, setSeenDialogue] = useState(window.innerWidth < dialogueWidthLimit || JSON.parse(localStorage.getItem('seenDialogue')!))

  const handleCloseDialogue = () => {
    setSeenDialogue(true);
  }

  const handleWindowResize = () => {
    if (window.innerWidth < dialogueWidthLimit) {
      setSeenDialogue(true);
    } else if (!JSON.parse(localStorage.getItem('seenDialogue')!)) {
      setSeenDialogue(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
  },[])

  
  // const { loading, error, data } = useQuery(Query);

  useEffect(() => {
    let charIdMap: { [shortname: string]: string } = {}
    let characterDb: ICharacterDb = {}
    let weaponDb: IWeaponDb = {}
    let artifactDb: IArtifactDb = {}
    let artifactSetDb: IArtifactSetDb = {}

    _.forEach(CharacterDb, (character: ICharacterData) => {
      characterDb[character._id] = character;

      const charName = character.name === "Traveler" ? getShortName(`${character.name}-${character.element}`) : getShortName(character.name);
      charIdMap[charName] = character._id;
    })

    _.forEach(WeaponDb, (weapon: IWeaponData) => {
      weaponDb[weapon._id] = weapon
    })

    _.forEach(ArtifactDb, (artifact: IArtifactData) => {
      artifactDb[artifact._id] = artifact
    })

    _.forEach(ArtifactSetDb, (set: IArtifactSetData) => {
      artifactSetDb[set._id] = set
    })

    dispatch(setArtifactDb(artifactDb))
    dispatch(setArtifactSetDb(artifactSetDb))
    dispatch(setCharacterDb(characterDb))
    dispatch(setCharacterIdMap(charIdMap))
    dispatch(setWeaponDb(weaponDb))
  }, [CharacterDb, ArtifactDb, ArtifactSetDb, WeaponDb,  getShortName, dispatch])

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
              <Route exact path="/" component={CharacterSearch} />
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
      <span className="build-ver">dev build 07.02.21</span>
    </div>
  )
}

export default App