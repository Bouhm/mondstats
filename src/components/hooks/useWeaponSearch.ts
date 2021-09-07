import { filter, includes, map, uniq } from 'lodash';

import { KEYWORDS } from '../controls/Searchbar';

function useWeaponSearch(weaponDb: any, data: any) {
  const searchWeapons = map(data, ({_id}) => {
    const weapon = weaponDb[_id]

    return ({
      _id,
      name: weapon.name,
      rarity: weapon.rarity,
      keys: uniq(
        filter(KEYWORDS, key => includes(weapon.effect, key))
      ).join(" ")
    })
  });
  return { searchWeapons }
}

export default useWeaponSearch;