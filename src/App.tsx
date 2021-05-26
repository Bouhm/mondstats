import './App.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import CharacterPage from './components/CharacterPage';
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar';
import Dropdown, { Option } from './components/ui/Dropdown';
import artifactDb from './data/artifacts.json';
import characterDb from './data/characters.json';
import allData from './data/data.json';
import { IData } from './data/types';
import weaponDb from './data/weapons.json';
import { getShortName } from './scripts/util';
import { Store } from './Store';

function App() {
  const [, dispatch] = useContext(Store)

  useEffect(() => {
    let charIdMap: { [shortname: string]: string } = {}
    _.forEach(_.values(characterDb), char => {
      charIdMap[getShortName(char.name)] = char.id + '';
    });

    dispatch({ type: "SET_ARTIFACT_DB", payload: artifactDb })
    dispatch({ type: "SET_WEAPON_DB", payload: weaponDb })
    dispatch({ type: "SET_CHARACTER_DB", payload: characterDb })
    dispatch({ type: 'SET_CHARACTER_ID_MAP', payload: charIdMap })
  }, [characterDb, artifactDb, weaponDb, getShortName, dispatch])

  const options = [
    { label: "All", value: "all" },
    { label: "Cleared Spiral Abyss", value: "abyssClears" },
    { label: "Mains", value: "mains" }
  ]

  const [data, setData] = useState<IData>(allData.all as unknown as IData)
  const location = useLocation();

  useEffect(() => {
    setData(allData.all as unknown as IData)
  }, [location, setData, allData])


  const handleSelect = (selected: Option) => {
    let data = allData.all;
    switch (selected.value) {
      case "all":
        data = allData.all;
        break;
      case "mains":
        data = allData.mains;
        break;
      case "abyssClears":
        data = allData.abyssClears;
        break;
      default:
        break;
    }

    setData(data as unknown as IData);
  }

  const renderCharacterSearch = () => <CharacterSearch dataTotal={2006} />
  const renderCharacterPage = () => {
    return (
      <>
        <div className="character-filter"><Dropdown options={options} onChange={handleSelect} defaultValue={options[0]} /></div>
        <CharacterPage data={data} />
      </>
    )
  }
  

  return (
    <div className="App">
      <Navbar />
      <section>
        <Switch>
          <Route exact path="/" render={renderCharacterSearch}/>
          <Route path="/builds/:shortName" render={renderCharacterPage} />
          <Redirect exact path="/builds" to="/" />
        </Switch>
      </section>
      <section>
        <div className="pls">Please contribute by setting your Battle Chronicle to public in Hoyolab. Thank you!
          <img src="https://img-os-static.hoyolab.com/communityWeb/upload/d81f8ba1e6e991a18aeda0ccbffe2eb0.png" />
        </div>
        <footer>WIP by Bouhm who has nothing to do with miHoYo, etc etc</footer>
      </section>
      <span className="build-ver">dev build 05.25.21</span>
    </div>
  )
}

export default App
