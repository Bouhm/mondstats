import './App.scss';
import 'react-popper-tooltip/dist/styles.css';
import 'rc-pagination/assets/index.css';

import { forEach } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

// import { gql, useQuery } from '@apollo/client';
import useApi from './components/hooks/useApi';
import { useAppDispatch } from './components/hooks/useRedux';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { ArrowUp } from './components/ui/Icons';
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
  // const topBuilds = useApi('/abyss/stats/top-abyss-builds.json');

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
      // dispatch(setTopBuilds(topBuilds))
      setHasLoadedDb(true)
    }
  }, [db, setHasLoadedDb])

  const scrollBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (scrollBtnRef.current) {
        if (window.scrollY > 0) {
          scrollBtnRef.current!.classList.remove("invis")
        } else {
          scrollBtnRef.current!.classList.add("invis")
        }
      }
    })
  }, [scrollBtnRef])

  return (
    <div className="App">
      <Navbar />
      <div className="App-content">
        <Sidebar />
        <main>
          {hasLoadedDb ? <Outlet /> : <Loader />}
          <div className="footer">
            <div className="scroll-to-top-button" ref={scrollBtnRef} onClick={() => window.scrollTo(0, 0)}>
              <ArrowUp />
            </div>
            <div className="links">
              <Link to="/about">About</Link>
              <Link to="/changelog">Changelog</Link>
              {/* <div className="notice" onClick={() => setShowNotice(true)}>⚠️</div> */}
            </div>
            <footer>Genshin Impact is a registered trademark of miHoYo Co., Ltd. Mondstats is not affiliated or in any way officially connected with miHoYo.</footer>
            <span className="build-ver">dev build 12.27.21</span>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App