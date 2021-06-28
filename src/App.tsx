import './App.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';

import About from './components/About';
import Changelog from './components/Changelog';
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import AbyssBattles from './data/abyssBattles.json';
import ArtifactSetDb from './data/artifactSets.json';
import CharacterBuilds from './data/characterBuilds.json';
import CharacterDb from './data/characters.json';
import {
  IArtifactSetData,
  IArtifactSetDb,
  ICharacterData,
  ICharacterDb,
  IWeaponData,
  IWeaponDb,
} from './data/types';
import WeaponDb from './data/weapons.json';
import { getShortName } from './scripts/util';
import { Store } from './Store';

function App() {
  const [, dispatch] = useContext(Store)
  // const { loading, error, data } = useQuery(Query);

  useEffect(() => {
    let charIdMap: { [shortname: string]: string } = {}
    let characterDb: ICharacterDb = {}
    let weaponDb: IWeaponDb = {}
    let artifactSetDb: IArtifactSetDb = {}

    _.forEach(CharacterDb, (character: ICharacterData) => {
      characterDb[character._id] = character;

      const charName = character.name === "Traveler" ? getShortName(`${character.name}-${character.element}`) : getShortName(character.name);
      charIdMap[charName] = character._id;
    })

    _.forEach(WeaponDb, (weapon: IWeaponData) => {
      weaponDb[weapon._id] = weapon
    })

    _.forEach(ArtifactSetDb, (set: IArtifactSetData) => {
      artifactSetDb[set._id] = set
    })

    dispatch({ type: "SET_ARTIFACT_DB", payload: artifactSetDb })
    dispatch({ type: "SET_WEAPON_DB", payload: weaponDb })
    dispatch({ type: "SET_CHARACTER_DB", payload: characterDb })
    dispatch({ type: "SET_CHARACTER_BUILDS", payload: CharacterBuilds })
    dispatch({ type: "SET_ABYSS_BATTLES", payload: AbyssBattles })
    dispatch({ type: 'SET_CHARACTER_ID_MAP', payload: charIdMap })
  }, [CharacterDb, ArtifactSetDb, WeaponDb, getShortName, dispatch])

  const renderCharacterSearch = () => <CharacterSearch dataTotal={11119} />
  const renderCharacterPage = () => {
    return (
      <>
        {/* <CharacterPage data={data} /> */}
      </>
    )
  }

  return (
    <div className="App">
      <Navbar />
      <main className="App-content">
        <Sidebar />
        <div className="section-view">
          <section>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/changelog" component={Changelog} />
              <Route exact path="/" render={renderCharacterSearch} />
              <Route path="/builds/:shortName" render={renderCharacterPage} />
              <Redirect exact path="/builds" to="/" />
            </Switch>
          </section>
          <section>
            <div className="links">
              <Link to="/about">About</Link>
              <Link to="/changelog">Changelog</Link>
            </div>
            <footer>Favonius.io is not affiliated, associated, authorized, endorsed by, or in any way officially connected with miHoYo.</footer>
          </section>
        </div>
      </main>
      <span className="build-ver">dev build 06.28.21</span>
    </div>
  )
}

export default App