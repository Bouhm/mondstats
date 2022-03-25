import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ListPlayerInput } from './player.inputs';
import { Player, PlayerDocument } from './player.model';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel(Player.name)
    private playerModel: Model<PlayerDocument>,
  ) {}

  list(filter: ListPlayerInput) {
    const queryFilter = {};

    if (filter) {
      const { uids } = filter;
      if (uids && uids.length > 0) {
        queryFilter['uid'] = { $in: uids };
      }
    }

    return this.playerModel.find(queryFilter).lean().exec();
  }

  getCount() {
    return this.playerModel.find().lean().countDocuments();
  }
}
