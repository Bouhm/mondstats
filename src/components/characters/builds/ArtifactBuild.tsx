import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactSet } from '../../../data/types';
import ArtifactSetInfo from '../../artifact-sets/ArtifactSetInfo';
import { useAppSelector } from '../../hooks/useRedux';

type ArtifactBuildProps = {
  artifacts: IArtifactSet[]
}

function ArtifactBuild({ artifacts }: ArtifactBuildProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)

  if (_.isEmpty(artifactSetDb)) return null;

  return (
    <div className="artifact-build">
      <h1>Artifacts</h1>
      {_.map(artifacts, ({ _id, activation_number }, i) => {
        const set = artifactSetDb[_id]

        return <ArtifactSetInfo key={`${_id}-${i}`} {...set} activation={activation_number} />
      })}
    </div>
  )
}

export default ArtifactBuild