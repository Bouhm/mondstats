import genshindb from 'genshin-db';
import { forEach, replace } from 'lodash';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ListWeaponInput } from './weapon.inputs';
import { Weapon, WeaponDocument } from './weapon.model';

@Injectable()
export class WeaponService {
  constructor(
    @InjectModel(Weapon.name)
    private weaponModel: Model<WeaponDocument>,
  ) {}

  list(filter: ListWeaponInput = {}) {
    const queryFilter = {};

    if (filter) {
      const { oids } = filter;
      if (oids && oids.length > 0) {
        queryFilter['oid'] = { $in: oids };
      }
    }

    return this.weaponModel.find(queryFilter).lean().exec();
  }

  async db() {
    const weapons = await this.weaponModel
      .find({ rarity: { $gte: 3 } })
      .lean()
      .exec();

    forEach(weapons, (weapon: any) => {
      const dbWeapon = genshindb.weapons(weapon.name);

      if (dbWeapon) {
        const { r1, r2, r3, r4, r5, baseatk, substat, subvalue, effectname, effect } = dbWeapon;
        const { attack, specialized } = dbWeapon.stats(90);

        weapon.baseAtk = `${baseatk}-${Math.round(attack)}`;
        weapon.subStat = substat;

        if (specialized < 1) {
          weapon.subValue = `${parseFloat(subvalue).toFixed(1)} - ${(
            (Math.round(specialized * 1000) / 1000) *
            100
          ).toFixed(1)}%`;
        } else {
          weapon.subValue = `${subvalue} - ${Math.round(specialized)}`;
        }
        weapon.effectName = effectname;
        let modEffect = effect;
        for (let i = 0; i < r1.length; i++) {
          modEffect = modEffect.replace(`{${i}}`, `${r1[i]}/${r2[i]}/${r3[i]}/${r4[i]}/${r5[i]}`);
        }
        weapon.effect = modEffect;
      }

      if (weapon.desc) delete weapon.description;
      delete weapon.__v;
      delete weapon.createdAt;
      delete weapon.updatedAt;
    });

    return weapons;
  }
}
