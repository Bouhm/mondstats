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
import {
  IArtifactSetData,
  IArtifactSetDb,
  ICharacterData,
  ICharacterDb,
  IWeaponData,
  IWeaponDb,
} from './data/types';
import { getShortName } from './scripts/util';
import { Store } from './Store';

const Query = gql`
  query GetAllData { 
    characters {
      _id
      id: oid
      name
      element
      rarity
      constellations {
        name
        effect
      }
    }

    weapons {
      _id
      id: oid
      name
      rarity
    }

    artifactSets {
      _id
      id: oid
      name
      affixes {
        effect
        activation_number
      }
    }
  } 
`;

function App() {
  const [, dispatch] = useContext(Store)
  const { loading, error, data } = useQuery(Query);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else if (error) {
      setHasError(true);
    } else if (data) {
      setIsLoading(false)
      setHasError(false)
      let characterDb: ICharacterDb = {}
      let weaponDb: IWeaponDb = {}
      let artifactSetDb: IArtifactSetDb = {}
      let charIdMap: { [shortname: string]: string } = {}

      _.forEach(data.characters, (character: ICharacterData) => {
        characterDb[character._id!] = character;

        const charName = character.name === "Traveler" ? getShortName(`${character.name}-${character.element}`) : getShortName(character.name);
        charIdMap[charName] = character._id;
      })

      _.forEach(data.weapons, (weapon: IWeaponData) => {
        weaponDb[weapon._id!] = weapon
      })

      _.forEach(data.artifactSets, (set: IArtifactSetData) => {
        artifactSetDb[set._id!] = set
      })

      dispatch({ type: "SET_ARTIFACT_DB", payload: artifactSetDb })
      dispatch({ type: "SET_WEAPON_DB", payload: weaponDb })
      dispatch({ type: "SET_CHARACTER_DB", payload: characterDb })
      dispatch({ type: 'SET_CHARACTER_ID_MAP', payload: charIdMap })
    }
  }, [loading, error, data, getShortName, dispatch])

  const renderCharacterSearch = () => <CharacterSearch dataTotal={10127} />
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
        <div>
          <section className="section-view">
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
      <span className="build-ver">dev build 05.27.21</span>
    </div>
  )
}

export default App
