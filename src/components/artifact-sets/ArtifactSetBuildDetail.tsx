import _ from 'lodash';
import React, { useContext } from 'react';

import { IArtifactSet } from '../../data/types';
import ArtifactSetInfo from '../artifactSets/ArtifactSetInfo';
import { useAppSelector } from '../hooks/useRedux';

type ArtifactSetBuildDetail = {
  id: string;
}

function ArtifactSetBuildDetail({ id }: ArtifactSetBuildDetail) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)

  if (_.isEmpty(artifactSetDb)) return null;

  return (
    <div className="artifact-set-build-detail">
      <h1>Artifacts</h1>
      {_.map(artifactSetBuildDb[id].sets, ({ _id, activation_number }, i) => {
        const set = artifactSetDb[_id]
        if (!set) return null;

        return <ArtifactSetInfo key={`${_id}-${i}`} {...set} activation={activation_number} />
      })}
    </div>
  )
}

export default ArtifactSetBuildDetail