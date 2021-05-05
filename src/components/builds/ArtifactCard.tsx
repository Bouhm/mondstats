import React from 'react'
import { IArtifact } from '../../data/types'

type ArtifactCardProps = {
  icon: string,
  name: string,
  activationNum: number
}

function ArtifactCard({ icon, name, activationNum }: ArtifactCardProps) {
  return (
    <div className="artifact-card">
      <img src={icon} alt={name} />
      <span>{activationNum}x</span>
    </div>
  )
}

export default ArtifactCard