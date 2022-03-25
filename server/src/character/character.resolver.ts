import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListCharacterInput } from './character.inputs';
import { Character } from './character.model';
import { CharacterService } from './character.service';

@Resolver()
export class CharacterResolver {
  constructor(private characterService: CharacterService) {}

  @Query(() => Character)
  async character(@Args('id', { nullable: true }) id: string) {
    return this.characterService.findById(id);
  }

  @Query(() => [Character])
  async characters(@Args('filter', { nullable: true }) filter?: ListCharacterInput) {
    const characters = this.characterService.list(filter);
    return characters;
  }
}
