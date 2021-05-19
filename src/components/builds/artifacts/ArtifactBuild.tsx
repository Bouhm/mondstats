import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactDb, IArtifactSet } from '../../../data/types';
import { Store } from '../../../Store';
import ArtifactCard from './ArtifactCard';

type ArtifactBuildProps = {
  artifacts: IArtifactSet[]
}

function ArtifactBuild({ artifacts }: ArtifactBuildProps) {
  const [{ artifactDb }] = useContext(Store)
  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 5, set: { id } });

  return (
    <div className="artifact-build">
      <h1>Artifacts</h1>
      {_.map(artifacts, ({ id, activation_number }, i) => {
        const artifact = getArtifactSet(id);
        if (!artifact) return null;

        return <ArtifactCard key={`${id}-${i}`} {...artifact} activation={activation_number} affixes={artifact.set.affixes} />
      })}
    </div>
  )
}

export default ArtifactBuild