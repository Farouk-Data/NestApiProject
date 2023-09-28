import { Module } from '@nestjs/common';
import { RankModule } from 'src/rank/rank.module';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MatchController],
  providers: [MatchService],
  imports: [PrismaModule, RankModule],
})
export class MatchModule {}
