import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RankService } from './rank.service';



@Controller('rank')
export class RankController {
  constructor(private rankService: RankService) {}

  // @Get(':id')
  // async findOneRank(@Param('id') id: string){
  //   return this.rankService.getOneRank(+id);
  // }

  @Get('play')
  async play(){
    return this.rankService.playMatch();
  }

  @Get(':id')
  async getNumOfMatchesPlayed(@Param('id') id: string) {
    return this.rankService.getNumOfMatchesPlayed(+id);
  }

  @Get(':id')
  async getNumOfWins(@Param('id') id: string) {
    return this.rankService.getNumOfWins(+id);
  }

  @Get(':id')
  async getNumOfLosses(@Param('id') id: string) {
    return (await this.rankService.getNumOfMatchesPlayed(+id) -  await this.rankService.getNumOfWins(+id));
  }

  @Get(':id')
  async getEloScore(@Param('id') id: string) {
    return this.rankService.getEloScore(+id);
  }

  @Get()
  async getAllRank(){
    this.rankService.updateRank();
    const users = await this.rankService.getAllRank();
    return users;
  }
  @Get('prov')
  async getProvRanking(){
    this.rankService.updateRank();
    const users = await this.rankService.getProvElo();
    return users;
  }

  @Get('esta')
  async getEstaRanking(){
    this.rankService.updateRank();
    const users = await this.rankService.getEstaElo();
    return users;
  }
  
}
