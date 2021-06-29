import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactBuild } from '../../../data/types';
import { Store } from '../../../Store';
import ArtifactCard from './ArtifactCard';

type ArtifactBuildProps = {
  artifacts: IArtifactBuild[]
}

function ArtifactBuild({ artifacts }: ArtifactBuildProps) {
  const [{ artifactDb, artifactSetDb }] = useContext(Store)

  if (_.isEmpty(artifactSetDb)) return null;

  return (
    <div className="artifact-build">
      <h1>Artifacts</h1>
      {_.map(artifacts, ({ _id, activation_number }, i) => {
        const artifact = artifactDb[_id]
        if (!artifact) return null;

        return <ArtifactCard key={`${_id}-${i}`} {...artifact} activation={activation_number} affixes={artifactSetDb[_id].affixes} />
      })}
    </div>
  )
}

export default ArtifactBuild