import { Args, Query, Resolver } from '@nestjs/graphql';

import { ListPlayerInput } from './player.inputs';
import { Player } from './player.model';
import { PlayerService } from './player.service';

@Resolver()
export class PlayerResolver {
  constructor(private playerService: PlayerService) {}

  @Query(() => [Player])
  async players(@Args('filter', { nullable: true }) filter?: ListPlayerInput) {
    return this.playerService.list(filter);
  }
}
