import './App.scss';
import 'react-popper-tooltip/dist/styles.css';
import 'rc-pagination/assets/index.css';

import { forEach } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

// import { gql, useQuery } from '@apollo/client';
import useApi from './components/hooks/useApi';
import { useAppDispatch } from './components/hooks/useRedux';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Dialogue from './components/ui/Dialogue';
import Loader from './components/ui/Loader';
import {
  IArtifactData,
  IArtifactDb,
  IArtifactSetBuildData,
  IArtifactSetBuildDb,
  IArtifactSetData,
  IArtifactSetDb,
  ICharacterData,
  ICharacterDb,
  IWeaponData,
  IWeaponDb,
} from './data/types';
import { getShortName } from './scripts/util';
import {
  setArtifactDb,
  setArtifactSetBuildDb,
  setArtifactSetDb,
  setCharacterDb,
  setCharacterIdMap,
  setWeaponDb,
} from './Store';

function App() {
  const dispatch = useAppDispatch()
  const [showNotice, setShowNotice] = useState(false)
  const [hasLoadedDb, setHasLoadedDb] = useState(false)
  // const { loading, error, data } = useQuery(Query);
  const db = useApi(`/db.json`);
  const notice = <p>
    This site shows the most <i>used</i> builds and teams which don't necessarily mean the <i>best</i>.
    <br/><br />
    Please also be mindful of other players' spending in the game 
    which may not reflect the objective value of a character or item.
  </p>

  useEffect(() => {
    if (db) {
      let charIdMap: { [shortname: string]: string } = {}
      let characterDb: ICharacterDb = {}
      let weaponDb: IWeaponDb = {}
      let artifactDb: IArtifactDb = {}
      let artifactSetDb: IArtifactSetDb = {}
      let artifactSetBuildDb: IArtifactSetBuildDb = {}
  
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

      forEach(db.artifactSetBuilds, (setBuild: IArtifactSetBuildData) => {
        artifactSetBuildDb[setBuild._id] = setBuild
      })
  
      dispatch(setArtifactDb(artifactDb))
      dispatch(setArtifactSetDb(artifactSetDb))
      dispatch(setArtifactSetBuildDb(artifactSetBuildDb))
      dispatch(setCharacterDb(characterDb))
      dispatch(setCharacterIdMap(charIdMap))
      dispatch(setWeaponDb(weaponDb))
      setHasLoadedDb(true)
    }
  }, [db, setHasLoadedDb])

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
            {hasLoadedDb ? <Outlet /> : <Loader />}
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
      <span className="build-ver">dev build 12.16.21</span>
    </div>
  )
}

export default App