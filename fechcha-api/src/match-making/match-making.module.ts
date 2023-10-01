import { Module } from '@nestjs/common';
import { MatchMakingGateway } from './match-making.gateway';


@Module({

  providers: [MatchMakingGateway]
})
export class MatchMakingModule {}
