import './CharacterPage.css';

import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IAbyss, IChar, ICharacterDb } from '../data/types';
import { Store } from '../Store';
import Abyss from './Abyss';
import BuildSelector from './builds/BuildSelector';
import elemColors from './builds/colors';

function CharacterPage() {
  const { shortName } = useParams<{ shortName: string }>();
  const [{ data, characterIdMap, characterDb, selectedCharacter }, dispatch] = useContext(Store)
  const [charData, setCharData] = useState<IChar | undefined>(undefined)
  const [abyssData, setAbyssData] = useState<IAbyss | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacterDb | undefined>(undefined)

  useEffect(() => {
    const charId = characterIdMap[shortName]

    if (charId) {
      setCharacter(characterDb[charId])
      setCharData(data.characters[charId])

      const characterAbyssData = _.cloneDeep(data.abyss);
      
      _.forEach(characterAbyssData, floor => {
        _.forEach(floor, stage => {
          _.forEach(stage, battle => {
            battle.teams = _.filter(battle.teams, team => {
              return _.includes(team.party, parseInt(charId))
            })
          })
        })
      })

      setAbyssData(characterAbyssData);
      dispatch({ type: 'SELECT_CHARACTER', payload: charId })
    }
  }, [setCharacter, setCharData, setAbyssData, dispatch, characterIdMap, shortName, data])

  if (!character || !charData) return null

  return (
    <div className="character-page" style={{ backgroundImage: `url("${character!.image}")` }}>
      <div className="character-stats-count" style={{ backgroundColor: elemColors[characterDb[selectedCharacter].element.toLowerCase()] }}>
        <span>Data from {data.characters[selectedCharacter].total} players</span>
      </div>
      {charData &&
        <BuildSelector
          artifacts={charData.artifacts}
          weapons={charData.weapons}
        />
      }
      {data.abyss &&
        <Abyss {...abyssData} />
      }
    </div>
  )
}

export default CharacterPage
