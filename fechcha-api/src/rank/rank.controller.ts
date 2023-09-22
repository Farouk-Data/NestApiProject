import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { RankService } from './rank.service';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';

@Controller('rank')
export class RankController {
  constructor(private rankService: RankService) {}

  @Get('prov')
  async getProvRanking(){
    this.rankService.updateRank();
    const users = await this.rankService.getProvRank();
    return users;
  }

  @Get('esta')
  async getEstaRanking(){
    this.rankService.updateRank();
    const users = await this.rankService.getEstaRank();
    return users;
  }
  
}
