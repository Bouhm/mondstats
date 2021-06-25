import './App.css';

import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';

import About from './components/About';
import Changelog from './components/Changelog';
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar';
import { getShortName } from './scripts/util';
import { Store } from './Store';

const Query = gql`
  query GetAllData { 
    characters {
      name
    }
  } 
`;

function App() {
  const [, dispatch] = useContext(Store)
  const [data, setData] = useState([])

  useEffect(() => {
    // let charIdMap: { [shortname: string]: string } = {}
    // _.forEach(_.values(characterDb), char => {
    //   const charName = char.name === "Traveler" ? getShortName(`${char.name}-${char.element}`) : getShortName(char.name);
    //   charIdMap[charName] = char.id + '';
    // });

    // dispatch({ type: "SET_ARTIFACT_DB", payload: artifactDb })
    // dispatch({ type: "SET_WEAPON_DB", payload: weaponDb })
    // dispatch({ type: "SET_CHARACTER_DB", payload: characterDb })
    // dispatch({ type: 'SET_CHARACTER_ID_MAP', payload: charIdMap })
  }, [getShortName, dispatch])

  function Test() {
    const { loading, error, data } = useQuery(Query);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <div>
        <p>
          {data}
        </p>
      </div>
    );
  }


  const renderCharacterSearch = () => <CharacterSearch dataTotal={2006} />
  const renderCharacterPage = () => {
    return (
      <>
        {/* <div className="character-filter"><Dropdown options={options} defaultValue={options[0]} /></div> */}
        {/* <CharacterPage data={data} /> */}
      </>
    )
  }

  return (
    <div className="App">
      <Navbar />
      <section>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/changelog" component={Changelog} />
          <Route exact path="/" render={renderCharacterSearch} />
          <Route path="/builds/:shortName" render={renderCharacterPage} />
          <Redirect exact path="/builds" to="/" />
        </Switch>
        <Test />
      </section>
      <section>
        <div className="links">
          <Link to="/about">About</Link>
          <Link to="/changelog">Changelog</Link>
        </div>
        <footer>Favonius.io is not affiliated, associated, authorized, endorsed by, or in any way officially connected with miHoYo.</footer>
      </section>
      <span className="build-ver">dev build 05.27.21</span>
    </div>
  )
}

export default App
