import './ArtifactSets.scss';

import { map } from 'lodash';
import React from 'react';

import { IArtifactSet } from '../../data/types';
import { shortenId } from '../../scripts/util';
import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage'

type ArtifactSetsProps = {
  artifacts: IArtifactSet[]
  selected?: boolean,
  color?: string,
  selector?: boolean
}

function ArtifactSets({ artifacts, color='', selected=false, selector=false }: ArtifactSetsProps) {
  const artifactSetDb = useAppSelector((state) => state.data.artifactSetDb)

  return (
    <div className={`artifact-sets-container ${selector ? 'asSelector' : ''} ${selected ? "asSelected" : ""}`} style={selected ? {backgroundColor: color }:{}}>
      {map(artifacts, ({ _id, activation_number }, i) => {
        return (
          <div key={`thumb-${shortenId(_id)}-i`} className={"artifact-thumb"}>
            <LLImage src={`/assets/artifacts/${shortenId(_id)}.webp`} alt={artifactSetDb[_id].name} />
            <div className="artifact-set-activation">{activation_number}x</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSets