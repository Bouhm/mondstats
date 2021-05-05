import React, { useContext, useState } from 'react'
import { Store } from '../../Store'
import _ from 'lodash'
import { IBuild } from '../../data/types'
import Build from './Build'

function BuildCarousel({ builds }: { builds: IBuild[] }) {
  const [{ selectedCharacter }] = useContext(Store)
  const [activeBuild, setActiveBuild] = useState(false)

  return (
    <div className="builds-carousel">
      <div className="character-build">
        {_.map(builds, (build, i) => <Build key={`${selectedCharacter}-build-${i}`} {...build} />)}
      </div>
    </div>
  )
}

export default BuildCarousel;