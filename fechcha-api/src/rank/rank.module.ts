import { Module } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankController } from './rank.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MatchesModule } from 'src/matches/matches.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [AuthModule, MatchesModule, PrismaModule, ],
  controllers: [RankController],
  providers: [RankService],
  exports : [RankService],
})
export class RankModule {}
