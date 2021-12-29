import './ArtifactSetBuildCard.scss';

import { map } from 'lodash';
import React from 'react';

import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage';

type ArtifactSetBuildCardProps = {
  id: string,
  selected?: boolean,
  selector?: boolean
}

function ArtifactSetBuildCard({ id, selected=false, selector=false }: ArtifactSetBuildCardProps) {
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)
  const colorClass = useAppSelector((state) => state.data.colorClass)
  const sets = artifactSetBuildDb[id] ? artifactSetBuildDb[id].sets : [];
  
  return (
    <div className={`artifact-set-build-card ${selector ? 'asSelector' : ''} ${selected ? `asSelected ${colorClass}` : ""}`}>
      {map(sets, ({ _id, activation_number }, i) => {
        return (
          <div key={`thumb-${_id}-i`} className={"artifact-set-thumb"}>
            <LLImage src={`/assets/artifacts/${_id}.webp`} />
            <div className="artifact-set-activation">{activation_number}x</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSetBuildCard