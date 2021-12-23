import { map } from 'lodash';

import { getCharacterLabel } from '../../scripts/util';

function useCharacterSearch(characterDb: any) {
  const searchCharacters = map(characterDb, (character) => {
    return ({
      _id: character._id,
      name: getCharacterLabel(character),
      element: character.element,
      rarity: character.rarity,
      keys: character.element
    })
  });

  return { searchCharacters }
}

export default useCharacterSearch;