import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactBuild } from '../../../data/types';
import { useAppSelector } from '../../../hooks';

type ArtifactCardProps = {
  artifacts: IArtifactBuild[]
  selected?: boolean
}

function ArtifactSets({ artifacts, selected=false }: ArtifactCardProps) {
  const artifactDb = useAppSelector((state) => state.data.artifactDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)

  return (
    <div className={`artifact-sets-container ${selected ? "selected" : ""}`} style={selected ? {backgroundColor: elementColor }:{}}>
      {_.map(artifacts, ({ _id, activation_number }, i) => {
        const artifact = artifactDb[_id];
        if (!artifact) return null;

        return (
          <div key={`thumb-${_id}-i`} className={"artifact-thumb"}>
            <img src={`/assets/artifacts/${artifact.oid}.png`} alt={artifact.name} />
            <div className="artifact-set-activation">{activation_number}x</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSets