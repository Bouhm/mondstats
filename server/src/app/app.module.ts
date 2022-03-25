import dotenv from 'dotenv';
import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { AbyssBattleModule } from '../abyss-battle/abyss-battle.module';
import { ArtifactSetModule } from '../artifact-set/artifact-set.module';
import { ArtifactModule } from '../artifact/artifact.module';
import { CharacterModule } from '../character/character.module';
import { PlayerCharacterModule } from '../player-character/player-character.module';
import { PlayerModule } from '../player/player.module';
import { WeaponModule } from '../weapon/weapon.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

dotenv.config();
const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jvgf0.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(URI),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      debug: false,
    }),
    AbyssBattleModule,
    ArtifactModule,
    ArtifactSetModule,
    CharacterModule,
    PlayerModule,
    PlayerCharacterModule,
    WeaponModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
