import React, { useContext, useState } from 'react'
import _ from 'lodash'

import { Store } from '../../Store'
import { IBuild } from '../../data/types'
import ArtifactCard from './ArtifactCard'

function BuildCarousel({ builds }: { builds: IBuild[] }) {
  const [{ selectedCharacter, artifactDb, weaponDb }] = useContext(Store)
  const [activeBuildIdx, setActiveBuildIdx] = useState(0)

  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 1, set: { id } });
  const getWeapon = (id: number) => _.find(weaponDb, { id });

  const renderSelectedBuild = () => {
    <div className="build-container">
          <div className="weapons-list">
            {_.map(builds[activeBuildIdx].weapons, ({ id, count }, i) => {
              const weapon = getWeapon(id);
              if (!weapon) return null;

              return (
                <div key={`${id}-${count}-${i}`} className="weapon-container">
                  <div className="weapon-card">
                    <img src={weapon.icon} alt={weapon.name} />
                    <span>{count}</span>
                  </div>
                  <div className="weapon-detail">
                    {weapon.desc}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="artifact-set-container">
            {_.map(builds[activeBuildIdx].artifacts, ({ id, activation_number }, i) => {
              const artifact = getArtifactSet(id);
              if (!artifact) return null;

              return (
                <div key={`${id}-${activation_number}-${i}`} className="artifact-set">
                  <ArtifactCard icon={artifact.icon} name={artifact.name} activationNum={activation_number} />
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
  }

  return (
    <div className="builds-carousel">
      <div className="character-builds-container">
        {renderSelectedBuild()}
        {_.map(builds, (build, i) => {
          return (
            <div key={`build-${i}`} className="artifacts-slider">
              {_.map(build.artifacts, ({id, activation_number}, i) => {
                  const artifact = getArtifactSet(id)
                  if (!artifact) return null

                  return <ArtifactCard key={`${id}-thumb-i`} icon={artifact.icon} name={artifact.name} activationNum={activation_number} />
                }
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BuildCarousel;