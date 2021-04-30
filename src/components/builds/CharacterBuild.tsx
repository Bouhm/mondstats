import React, { useContext, useState } from 'react'
import { Store } from '../../Store'
import _ from 'lodash'
import { IArtfifactBuild, IArtifact } from '../../data/types'

type ArtifactBuildProps = {
  sets: ArtifactSetProps[],
  isExpanded: boolean
}

type ArtifactSetProps = {
  id: number,
  activationNumber: number
}

function ArtifactSet({ id, activationNumber, isExpanded }: ArtifactSetProps & { isExpanded: boolean }) {
  const [{ artifactDb },] = useContext(Store);
  const artifact: IArtifact = _.find(artifactDb, { pos: 1, set: { id } })!;

  if (!artifact) return null;

  return (
    <>
      <div className="artifact-set" style={{ backgroundImage: `url("${artifact.icon}")` }}>
        <span>{activationNumber}x</span>
      </div>
      <div>
        {isExpanded &&
          <div className="artifact-set-details">
            {_.map(artifact.set.affixes, affix => {
              return (
                <div>
                  {affix.activation_number}-Piece: {affix.effect}
                </div>
              )
            })}
          </div>
        }
      </div>
    </>
  )
}

function ArtifactBuild({ sets, isExpanded }: ArtifactBuildProps) {
  return (
    <div className="artifact-build-container">
      {_.map(sets, set => <ArtifactSet isExpanded {...set} />)}
    </div>
  )
}

export default ArtifactBuild