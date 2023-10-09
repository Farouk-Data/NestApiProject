import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesGateway } from './matches.gateway';
import { MatchesController } from './matches.controller';
import { RankModule } from 'src/rank/rank.module';
import { RankService } from 'src/rank/rank.service';

@Module({
  controllers: [MatchesController],
  providers: [MatchesGateway, MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
