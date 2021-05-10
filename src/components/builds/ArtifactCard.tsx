import React from 'react'
import _ from 'lodash'
import { IArtifact } from '../../data/types'

function ArtifactCard({ rarity, icon, name }: IArtifact) {
  return (
    <div className={`artifact-card rarity-${rarity}`}>
      <img src={icon} alt={name} />
      <div className="artifact-name">
        {name}
      </div>
    </div>
  )
}

export default ArtifactCard