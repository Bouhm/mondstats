import './ArtifactSetBuildCard.scss';

import { map } from 'lodash';
import React from 'react';

import { IArtifactSet } from '../../data/types';
import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage';

type ArtifactSetBuildCardProps = {
  id: string,
  selected?: boolean,
  color?: string,
  selector?: boolean
}

function ArtifactSetBuildCard({ id, color='', selected=false, selector=false }: ArtifactSetBuildCardProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  
  console.log(artifactSetBuildDb[id])

  if (artifactSetBuildDb[id].sets) {
    return null
  }

  return (
    <div className={`artifact-set-build-card-container ${selector ? 'asSelector' : ''} ${selected ? "asSelected" : ""}`} style={selected ? {backgroundColor: color }:{}}>
      {map(artifactSetBuildDb[id].sets, ({ _id, activation_number }, i) => {
        return (
          <div key={`thumb-${_id}-i`} className={"artifact-thumb"}>
            <LLImage src={`/assets/artifacts/${_id}.webp`} alt={artifactSetDb[_id].name} />
            <div className="artifact-set-activation">{activation_number}x</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSetBuildCard