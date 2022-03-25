import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListPlayerCharacterInput } from './player-character.inputs';
import { PlayerCharacter } from './player-character.model';
import { PlayerCharacterService } from './player-character.service';

@Resolver()
export class PlayerCharacterResolver {
  constructor(private playerCharacterService: PlayerCharacterService) {}

  @Query(() => [PlayerCharacter])
  async playerCharacters(@Args('filter', { nullable: true }) filter?: ListPlayerCharacterInput) {
    return this.playerCharacterService.list(filter);
  }
}
