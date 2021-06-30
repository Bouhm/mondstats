import './App.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';

import About from './components/About';
import Changelog from './components/Changelog';
import CharacterPage from './components/CharacterPage';
import CharacterSearch from './components/CharacterSearch';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Dialogue from './components/ui/Dialogue';
import UnderConstruction from './components/WIP';
import AbyssBattles from './data/abyssBattles.json';
import ArtifactDb from './data/artifacts.json';
import ArtifactSetDb from './data/artifactSets.json';
import CharacterBuilds from './data/characterBuilds.json';
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
import {
  setAbyssbattles,
  setArtifactDb,
  setArtifactSetDb,
  setCharacterBuilds,
  setCharacterDb,
  setCharacterIdMap,
  setWeaponDb,
} from './Store';

function App() {
  const characterBuilds = useAppSelector((state) => state.data.characterBuilds)
  const abyssBattles = useAppSelector((state) => state.data.abyssBattles)
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
    dispatch(setCharacterBuilds(CharacterBuilds))
    dispatch(setAbyssbattles(AbyssBattles))
    dispatch(setCharacterIdMap(charIdMap))
    dispatch(setWeaponDb(weaponDb))
  }, [CharacterDb, ArtifactDb, ArtifactSetDb, WeaponDb,  getShortName, dispatch])

  const renderCharacterSearch = () => <CharacterSearch dataTotal={11449} />
  const renderCharacterPage = () => {
    return (
      <>
        <CharacterPage data={{ characters: characterBuilds, abyss: abyssBattles }} />
      </>
    )
  }

  return (
    <div className="App">
      {!seenDialogue && (
        <Dialogue 
        onClose={handleCloseDialogue}>
          The past month was spent on database migration and building out a back-end server. Now that that's done, I'll finally implement more interesting content with the data in the following weeks. Please feel free to throw any suggestions at <b>Bouhm#2205</b> on Discord.
        </Dialogue>
      )}
      <Navbar />
      <main className="App-content">
        <Sidebar />
        <div className="section-view" style={!seenDialogue ? {
        filter: "blur(2px)", 
        opacity: 0.1
      } : {}}>
          <section>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/changelog" component={Changelog} />
              <Route path="/abyss" component={UnderConstruction} />
              <Route path="/characters" component={UnderConstruction} />
              <Route path="/artifacts" component={UnderConstruction} />
              <Route path="/weapons" component={UnderConstruction} />
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