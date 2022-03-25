import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { Character, CharacterSchema } from '../character/character.model';
import { AbyssBattle, AbyssBattleSchema } from './abyss-battle.model';
import { AbyssBattleResolver } from './abyss-battle.resolver';
import { AbyssBattleService } from './abyss-battle.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AbyssBattle.name, schema: AbyssBattleSchema },
      // { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  exports: [AbyssBattleService],
  providers: [AbyssBattleService, AbyssBattleResolver],
})
export class AbyssBattleModule {}
