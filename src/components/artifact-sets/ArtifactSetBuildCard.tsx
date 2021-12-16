import './ArtifactSetBuildCard.scss';

import { isEmpty, map } from 'lodash';
import React, { useEffect } from 'react';

import { clippingParents } from '@popperjs/core';

import { IArtifactSet } from '../../data/types';
import { useAppSelector } from '../hooks/useRedux';
import LLImage from '../ui/LLImage';

type ArtifactSetBuildCardProps = {
  id: string,
  selected?: boolean,
  color?: string,
  selector?: boolean
}

function ArtifactSetBuildCard({ id, color='', selected=false, selector=false }: ArtifactSetBuildCardProps) {
  const artifactSetBuildDb = useAppSelector((state) => state.data.artifactSetBuildDb)

  return (
    <div className={`artifact-set-build-card ${selector ? 'asSelector' : ''} ${selected ? "asSelected" : ""}`} style={selected ? {backgroundColor: color }:{}}>
      {map(artifactSetBuildDb[id].sets, ({ _id, activation_number }, i) => {
        return (
          <div key={`thumb-${_id}-i`} className={"artifact-set-thumb"}>
            <LLImage src={`/assets/artifacts/${_id}.webp`} />
            <div className="artifact-set-activation">{activation_number}x</div>
          </div>
        )
      })}
    </div>
  )
}

export default ArtifactSetBuildCard