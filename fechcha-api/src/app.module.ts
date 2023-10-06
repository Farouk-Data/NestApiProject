import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RankModule } from './rank/rank.module';
import { HomeModule } from './home/home.module';
import { MatchMakingModule } from './match-making/match-making.module';
import { MatchesModule } from './matches/matches.module';

//config for env
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), HomeModule, AuthModule, PrismaModule, RankModule, MatchMakingModule, MatchesModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
