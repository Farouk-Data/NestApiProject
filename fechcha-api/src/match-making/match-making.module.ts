import { Module } from '@nestjs/common';
import { MatchMakingService } from './match-making.service';
import { MatchMakingGateway } from './match-making.gateway';

@Module({
  providers: [MatchMakingGateway, MatchMakingService]
})
export class MatchMakingModule {}
