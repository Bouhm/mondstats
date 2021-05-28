import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactBuild } from '../../../data/types';
import { Store } from '../../../Store';

type ArtifactCardProps = {
  artifacts: IArtifactBuild[]
  selected?: boolean
}

function ArtifactSets({ artifacts, selected=false }: ArtifactCardProps) {
  const [{ artifactDb, elementColor }] = useContext(Store)
  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 5, set: { id } });

  return (
    <div className={`artifact-sets-container ${selected ? "selected" : ""}`} style={selected ? {backgroundColor: elementColor }:{}}>
      {_.map(artifacts, ({ id, activation_number }, i) => {
        const artifact = getArtifactSet(id);
        if (!artifact) return null;

        return (
          <div key={`thumb-${id}-i`} className={"artifact-thumb"}>
            <img src={`/assets/artifacts/${artifact.id}.png`} alt={artifact.name} />
            <div className="artifact-set-activation">{activation_number}x</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSets