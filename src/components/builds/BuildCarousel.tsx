import React, { useContext, useState } from 'react'
import _ from 'lodash'

import { Store } from '../../Store'
import { IBuild } from '../../data/types'
import ArtifactSets from './ArtifactSets'
import './BuildCarousel.css'
import Weapon from './Weapon'

function BuildCarousel({ builds }: { builds: IBuild[] }) {
  const [{ selectedCharacter, artifactDb, weaponDb }] = useContext(Store)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)

  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 5, set: { id } });
  const getWeapon = (id: number) => _.find(weaponDb, { id });

  const renderSelectedBuild = () => {
    return (
      <div className="build-container">
        <div className="weapons-list">
          {_.map(_.orderBy(builds[activeBuildIdx].weapons, 'count', 'desc'), ({ id, count }, i) => {
            const weapon = getWeapon(id);
            if (!weapon) return null;

            return (
              <div className="weapon-container">
                <Weapon key={`${id}-${count}-${i}`} {...weapon} isLarge={activeBuildIdx === i} />
                <div className="weapon-count">{Math.round((count / builds[activeBuildIdx].count) * 100)}%</div>
              </div>
            )
          })}
        </div>
        <div className="artifact-build-container">
          {_.map(builds[activeBuildIdx].artifacts, ({ id, activation_number }, i) => {
            const artifact = getArtifactSet(id);
            if (!artifact) return null;

            return (
              <div key={`${id}-${activation_number}-${i}`} className="artifact-set">
                <div className="artifact-set-details">
                  {_.map(artifact.set.affixes, affix => {
                    return (
                      <div> 
                        {affix.activation_number}-Piece: {affix.effect}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="builds-carousel">
      <div className="character-builds-container">
        {renderSelectedBuild()}
        {builds[activeBuildIdx].count}
      </div>
      <div className="character-builds-selector">
        {_.map(builds, (build, i) => {
          return (
            <div onClick={() => setActiveBuildIdx(i)}>
              <ArtifactSets key={`artifacts-thumb=${i}`} artifacts={build.artifacts} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BuildCarousel