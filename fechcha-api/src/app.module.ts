import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RankModule } from './rank/rank.module';


//config for env
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UserModule, PrismaModule, RankModule],
})
export class AppModule {}
