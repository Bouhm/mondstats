import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Player, PlayerSchema } from './player.model';
import { PlayerResolver } from './player.resolver';
import { PlayerService } from './player.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }])],
  providers: [PlayerService, PlayerResolver],
})
export class PlayerModule {}
