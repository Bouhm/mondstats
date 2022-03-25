import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AbyssBattle, AbyssBattleSchema } from '../abyss-battle/abyss-battle.model';
import { PlayerCharacter, PlayerCharacterSchema } from './player-character.model';
import { PlayerCharacterResolver } from './player-character.resolver';
import { PlayerCharacterService } from './player-character.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlayerCharacter.name, schema: PlayerCharacterSchema }]),
    MongooseModule.forFeature([{ name: AbyssBattle.name, schema: AbyssBattleSchema }]),
  ],
  providers: [PlayerCharacterService, PlayerCharacterResolver],
})
export class PlayerCharacterModule {}
