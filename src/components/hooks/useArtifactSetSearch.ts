import { filter, flatten, includes, map, reduce, uniq } from 'lodash';

import { KEYWORDS } from '../controls/Searchbar';

function useArtifactSetSearch(artifactSetDb: any) {
  const searchArtifactSets = filter(map(artifactSetDb, ({_id}) => {
    const set = artifactSetDb[_id]

    if (set && set.affixes.length > 1) {
      return ({
        _id,
        name: set.name,
        rarity: set.rarity,
        keys: uniq(flatten(map(set.affixes, affix => (
          filter(KEYWORDS, key => includes(affix.effect.toLowerCase(), key))
        )))).join(" ")
      })
    }
  }), set => !!set);

  return { searchArtifactSets }
}

export default useArtifactSetSearch;