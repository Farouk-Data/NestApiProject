import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';

//make it global so we don't import it in every module
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [PrismaController]
})
export class PrismaModule {}
