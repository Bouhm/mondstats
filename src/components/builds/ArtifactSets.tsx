import _ from 'lodash'
import React from 'react'
import { IArtifactBuild } from '../../data/types'

type ArtifactCardProps = {
  artifacts: IArtifactBuild[]
}

function ArtifactSets({ artifacts }: ArtifactCardProps) {
  return (
    <div className="artifact-sets-container">
      {_.map(artifacts, artifact => {

      })}
    </div>
  )
}

export default ArtifactSets