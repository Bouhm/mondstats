import React, { useContext } from 'react'
import _ from 'lodash'
import { Store } from '../../Store'
import { IBuild } from '../../data/types'

function Build({ weapons, artifacts }: IBuild) {
  const [{ weaponDb, artifactDb },] = useContext(Store);

  const getArtifactSet = (id: number) => _.find(artifactDb, { pos: 1, set: { id } });
  const getWeapon = (id: number) => _.find(weaponDb, { id });

  return (
    <div className="build-container">
      <div className="weapons-list">
        {_.map(weapons, ({ id, count }, i) => {
          const weapon = getWeapon(id);
          if (!weapon) return null;

          return (
            <div key={`${id}-${count}-${i}`} className="weapon-container">
              <div className="weapon-card" style={{ backgroundImage: `url("${weapon.icon}")` }}>
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
        {_.map(artifacts, ({ id, activation_number }, i) => {
          const artifact = getArtifactSet(id);
          if (!artifact) return null;

          return (
            <div key={`${id}-${activation_number}-${i}`} className="artifact-set">
             <div className="artifact-card" style={{ backgroundImage: `url("${artifact.icon}")` }}>
                <span>{activation_number}x</span>
              </div>
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

export default Build