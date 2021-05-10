import React, { useContext, useState } from 'react'
import _ from 'lodash'

import { Store } from '../../Store'
import { IBuild } from '../../data/types'
import ArtifactSets from './ArtifactSets'
import './BuildCarousel.css'
import Weapon from './WeaponCard'
import ArtifactCard from './ArtifactCard'

function BuildCarousel({ builds }: { builds: IBuild[] }) {
  const [{ selectedCharacter, artifactDb, weaponDb }] = useContext(Store)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)

  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 1, set: { id } });
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
                <Weapon key={`${id}-${count}-${i}`} {...weapon} popularity={Math.round((count / builds[activeBuildIdx].count) * 100)} />
              </div>
            )
          })}
        </div>
        <div className="artifact-build-container">
          {_.map(builds[activeBuildIdx].artifacts, ({ id }, i) => {
            const artifact = getArtifactSet(id);
            if (!artifact) return null;

            return (
              <div>
                <ArtifactCard {...artifact} />
                <div className="artifact-set-details">
                  {_.map(artifact.set.affixes, affix => <div>{affix.activation_number}-Piece: {affix.effect}</div>)}
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