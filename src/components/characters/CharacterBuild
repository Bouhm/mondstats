import React, { useState } from 'react'
import _ from 'lodash'
import artifactDb from '../../data/artifacts.json'
import weaponDb from '../../data/weapons.json'
import characterDb from '../../data/characters.json'
import './Character.css'

type CharacterProps = {
  id: number,
  artifacts: any[],
  weapons: any[]
}

function Character({ id, artifacts, weapons }: CharacterProps) {
  const character = _.find(characterDb, { id })

  return (
    <div className="character-container">
      <div className="character-portrait" style={{ backgroundImage: `url("${character!.image.replace('@2x', '')}")` }} />
      <div className="character-artifacts">
      </div>
      <div className="character-weapons">
        {_.find(weaponDb, (weapon: any) => {

        })}
      </div>
      <div className="character-constellations">
      </div>
    </div>
  )
}

export default Character
