import { filter, flatten, includes, map, reduce, uniq } from 'lodash';

import { KEYWORDS } from '../controls/Searchbar';

function useArtifactSetSearch(artifactSetDb: any) {
  const searchArtifactSets = map(artifactSetDb, ({_id}) => {
    const set = artifactSetDb[_id]

    if (set) {
      return ({
        _id,
        name: set.name,
        rarity: set.rarity,
        keys: uniq(flatten(map(set.affixes, affix => (
          filter(KEYWORDS, key => includes(affix.effect.toLowerCase(), key))
        )))).join(" ")
      })
    }
  });

  return { searchArtifactSets }
}

export default useArtifactSetSearch;