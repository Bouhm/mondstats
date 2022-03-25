import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Weapon, WeaponSchema } from './weapon.model';
import { WeaponResolver } from './weapon.resolver';
import { WeaponService } from './weapon.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Weapon.name, schema: WeaponSchema }])],
  providers: [WeaponService, WeaponResolver],
})
export class WeaponModule {}
