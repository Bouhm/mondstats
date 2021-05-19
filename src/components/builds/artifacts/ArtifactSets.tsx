import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactSet } from '../../../data/types';
import { Store } from '../../../Store';

type ArtifactCardProps = {
  artifacts: IArtifactSet[]
  selected?: boolean
}

function ArtifactSets({ artifacts, selected=false }: ArtifactCardProps) {
  const [{ artifactDb }] = useContext(Store)
  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 5, set: { id } });

  return (
    <div className={`artifact-sets-container ${selected ? "selected" : ""}`}>
      {_.map(artifacts, ({ id, activation_number }, i) => {
        const artifact = getArtifactSet(id);
        if (!artifact) return null;

        return (
          <div key={`thumb-${id}-i`} className={"artifact-thumb"}>
            <img src={artifact.icon} alt={artifact.name} />
            <div className="artifact-set-activation">{activation_number}x</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSets