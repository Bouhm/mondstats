import './App.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import CharacterPage from './components/CharacterPage';
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar';
import artifactDb from './data/artifacts.json';
import characterDb from './data/characters.json';
import data from './data/data.json';
import { ICharacterDb, ICharData, IData } from './data/types';
import weaponDb from './data/weapons.json';
import { getShortName } from './scripts/util';
import { Store } from './Store';

function App() {
  const [, dispatch] = useContext(Store)
  const [dataTotal, setDataTotal] = useState<number>()

  useEffect(() => {
    let charIdMap: { [shortname: string]: string } = {}
    _.forEach(_.values(characterDb), char => {
      charIdMap[getShortName(char.name)] = char.id + '';
    });

    dispatch({ type: "SET_ALL_DATA", payload: data.all })
    dispatch({ type: "SET_ABYSS_CLEARS_DATA", payload: data.abyssClears })
    dispatch({ type: "SET_MAINS_DATA", payload: data.mains })
    dispatch({ type: "SET_ARTIFACT_DB", payload: artifactDb })
    dispatch({ type: "SET_WEAPON_DB", payload: weaponDb })
    dispatch({ type: "SET_CHARACTER_DB", payload: characterDb })
    dispatch({ type: 'SET_CHARACTER_ID_MAP', payload: charIdMap })
  }, [characterDb, artifactDb, weaponDb, data, getShortName, dispatch, setDataTotal])

  const renderCharacterSearch = () => <CharacterSearch dataTotal={2006} />

  return (
    <Router>
      <div className="App">
        <Navbar />
        <section>
          <Switch>
            <Route exact path="/" render={renderCharacterSearch}/>
            <Route path="/builds/:shortName" component={CharacterPage} />
            <Redirect exact path="/builds" to="/" />
          </Switch>
        </section>
        <section>
          <div className="pls">Please contribute by setting your Battle Chronicle to public in Hoyolab. Thank you!
            <img src="https://img-os-static.hoyolab.com/communityWeb/upload/d81f8ba1e6e991a18aeda0ccbffe2eb0.png" />
          </div>
          <footer>WIP by Bouhm who has nothing to do with miHoYo, etc etc</footer>
        </section>
        <span className="build-ver">dev build 05.22.21</span>
      </div>
    </Router>
  )
}

export default App
