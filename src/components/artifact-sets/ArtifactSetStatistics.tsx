import './ArtifactSetStatistics.css';

import React, { useEffect, useState } from 'react';

import { IArtifactSetStats } from '../../data/types';

function ArtifactSetStatistics() { 
  const [artifactSetStats, setArtifactSetStats] = useState<IArtifactSetStats[] | undefined>(undefined)
  
  return (
    <div className="artifact-set-stats-container" />
  )
}

export default ArtifactSetStatistics