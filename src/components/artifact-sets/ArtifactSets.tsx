import { map } from 'lodash';
import React from 'react';

import { IArtifactSet } from '../../data/types';
import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage';

type ArtifactSetBuildProps = {
  artifacts: IArtifactSet[]
  selected?: boolean,
  color?: string,
  selector?: boolean
}

function ArtifactSets({ artifacts, color='', selected=false, selector=false }: ArtifactSetBuildProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)

  return (
    <div className={`artifact-sets-container ${selector ? 'asSelector' : ''} ${selected ? "asSelected" : ""}`} style={selected ? {backgroundColor: color }:{}}>
      {map(artifacts, ({ _id, activation_number }, i) => {
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

export default ArtifactSets