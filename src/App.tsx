import './App.css';

import _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import CharacterPage from './components/CharacterPage';
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar';
import artifactDb from './data/artifacts.json';
import characterDb from './data/characters.json';
import data from './data/data.json';
import weaponDb from './data/weapons.json';
import { getShortName } from './scripts/util';
import { Store } from './Store';

function App() {
  const [, dispatch] = useContext(Store)

  useEffect(() => {
    console.log("App use effect")
    let charIdMap: { [shortname: string]: string } = {}
    _.forEach(_.values(characterDb), char => {
      charIdMap[getShortName(char.name)] = char.id + '';
    });

    dispatch({ type: "SET_DATA", payload: data })
    dispatch({ type: "SET_ARTIFACT_DB", payload: artifactDb })
    dispatch({ type: "SET_WEAPON_DB", payload: weaponDb })
    dispatch({ type: "SET_CHARACTER_DB", payload: characterDb })
    dispatch({ type: 'SET_CHARACTER_ID_MAP', payload: charIdMap })
  }, [characterDb, artifactDb, weaponDb, data, getShortName, dispatch])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <section>
          <Switch>
            <Route exact path="/" component={CharacterSearch} />
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
        <span className="build-ver">dev build 05.13.21</span>
      </div>
    </Router>
  )
}

export default App
