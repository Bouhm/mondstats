import './ArtifactSets.scss';

import { map } from 'lodash';
import React from 'react';

import { IArtifactSet } from '../../data/types';
import { useAppSelector } from '../hooks/useRedux';

type ArtifactSetsProps = {
  artifacts: IArtifactSet[]
  selected?: boolean,
  color: string
}

function ArtifactSets({ artifacts, color, selected=false }: ArtifactSetsProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)

  return (
    <div className={`artifact-sets-container ${selected ? "selected" : ""}`} style={selected ? {backgroundColor: color }:{}}>
      {map(artifacts, ({ _id, activation_number }, i) => {
        return (
          <div key={`thumb-${_id}-i`} className={"artifact-thumb"}>
            <img src={`/assets/artifacts/${artifactSetDb[_id].oid}.webp`} alt={artifactSetDb[_id].name} />
            <div className="artifact-set-activation">{activation_number}x</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSets