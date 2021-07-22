import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactBuild } from '../../../data/types';
import { useAppSelector } from '../../../useRedux';

type ArtifactSetsProps = {
  artifacts: IArtifactBuild[]
  selected?: boolean
}

function ArtifactSets({ artifacts, selected=false }: ArtifactSetsProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)

  return (
    <div className={`artifact-sets-container ${selected ? "selected" : ""}`} style={selected ? {backgroundColor: elementColor }:{}}>
      {_.map(artifacts, ({ _id, activation_number }, i) => {
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