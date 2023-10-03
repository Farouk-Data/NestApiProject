import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get('play')
  async playMatch(){
    this.matchService.playMatch();
  }
}
