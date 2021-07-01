import './CharacterPage.css';

import AmberSad from '/assets/amberSad.png';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IAbyssBattle, ICharacterBuild, ICharacterData } from '../../data/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCharacter, setElementColor } from '../../Store';
import Toggle from '../ui/Toggle';

type CharacterPageProps = {
  data: { 
    characters: ICharacterBuild[],
  }
}

function CharacterPage({ data }: CharacterPageProps) {  
  const { shortName } = useParams<{ shortName: string }>();

  const characterIdMap = useAppSelector((state) => state.data.characterIdMap)
  const characterDb = useAppSelector((state) => state.data.characterDb)
  const elementColor = useAppSelector((state) => state.data.elementColor)
  const dispatch = useAppDispatch()

  const [charData, setCharData] = useState<ICharacterBuild | undefined>(undefined)
  const [abyssData, setAbyssData] = useState<IAbyssBattle[] | undefined>(undefined)
  const [character, setCharacter] = useState<ICharacterData | undefined>(undefined)
  const [f2p, setF2p] = useState(false);
  const charId = characterIdMap[shortName]

  return (
    <div className="weapon-stats-page">
    
    </div>
  )
}

export default CharacterPage