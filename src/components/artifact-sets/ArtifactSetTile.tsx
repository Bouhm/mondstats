import './ArtifactSetTile.scss';

import _ from 'lodash';
import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getCharacterFileName, getShortName } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';

export type CharacterTileProps = {
  id: string,
  onClick?: (set: string) => void
}

function ArtifactSetTile({ id, onClick }: CharacterTileProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSet = artifactSetDb[id]

  if (!artifactSet) return null;

  let classes = "artifact-set-tile";
  classes += ` rarity-${artifactSet.rarity}`;

  const handleClick = (set: string) => {
    onClick && onClick(set);
  }

  return (
    <div className={`artifact-set-tile-container`} onClick={() => handleClick(artifactSet.name)}>
      <div className={classes}>
        <div className="artifact-set-image">
          <img className="artifact-set-thumb" src={`/assets/artifacts/${getCharacterFileName(artifactSet)}.webp`} alt={`${artifactSet.name}-thumb`}></img>
        </div>
      </div>
    </div>
  )
}

export default ArtifactSetTile