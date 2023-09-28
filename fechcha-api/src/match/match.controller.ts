import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchService } from './match.service';
import { RankService } from 'src/rank/rank.service';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get('play')
  async playMatch(){
    this.matchService.playMatch();
  }
}
