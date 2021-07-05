import './ArtifactSetStatistics.css';
import ArtifactSetStats from '../../data/artifactSetStats.json';

import React, { useEffect, useState } from 'react';
import { IArtifactSetStats } from '../../data/types';

function ArtifactSetStatistics() { 
  const [artifactSetStats, setArtifactSetStats] = useState<IArtifactSetStats | undefined>(undefined)
  
  useEffect(() => {
    setArtifactSetStats(artifactSetStats)
  }, [setArtifactSetStats, ArtifactSetStats])


  return (
    <div className="artifact-set-stats-container" />
  )
}

export default ArtifactSetStatistics