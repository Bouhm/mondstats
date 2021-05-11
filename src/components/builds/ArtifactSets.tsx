import React, { useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'
import { IArtifactBuild } from '../../data/types'

type ArtifactCardProps = {
  artifacts: IArtifactBuild[]
}

function ArtifactSets({ artifacts }: ArtifactCardProps) {
  const [{ artifactDb }] = useContext(Store)
  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 5, set: { id } });

  return (
    <div className="artifact-sets-container">
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