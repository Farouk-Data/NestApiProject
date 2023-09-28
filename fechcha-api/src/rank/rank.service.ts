import { Injectable } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { Player } from '@prisma/client'

@Injectable()
export class RankService {

  //dependcy injection
  constructor(
    private prisma: PrismaService
  ) {}
  async updateRankBoard(): Promise<void> {
    const players = await this.prisma.player.findMany({
      where: {
        rankBoard: 'Provisional',
        numOfGames:{
          gt: 20,
        }
      },
    });

    for (const player of players){
      await this.prisma.player.update({
        where: { playerId : player.playerId},
        data:{
          rankBoard: 'Established'
        },
      })
    }
  }
  async getOneRank(id: number): Promise<Player | null>{
    const user = await this.prisma.player.findUnique({
      where: {
        playerId: id
      }
    });
    return (user);
  }
  async getProvRank(){
    return this.prisma.player.findMany({
      where: {
        rankBoard: 'Provisional',
      },
      orderBy: {
        rank: 'asc',
      }
    });
  }
  async getAllRank(){
    return this.prisma.player.findMany();
  }
  async getEstaRank(){
    return this.prisma.player.findMany({
      where: {
        rankBoard: 'Established',
      },
      orderBy: {
        rank: 'asc',
      }
    });
  }

  async updateDivision(): Promise<void> {
    const players = await this.prisma.player.findMany();
    for (const player of players){
      if (player.rankBoard == "Established"){
        if (player.eloRating < 800 && player.division != "Nooby"){
            await this.prisma.player.update({
              where: {playerId : player.playerId},
              data: {division: "Nooby"},
            })
        }
        if ((player.eloRating >= 800 && player.eloRating < 1250) && player.division != "Bronze"){
          await this.prisma.player.update({
            where: {playerId : player.playerId},
            data: {division: "Bronze"},
          })
        }
        if ((player.eloRating >= 1250 && player.eloRating < 1800) && player.division != "Gold"){
          await this.prisma.player.update({
            where: {playerId : player.playerId},
            data: {division: "Gold"},
          })
        }
        if ((player.eloRating >= 1800) && player.division != "Legend"){
          await this.prisma.player.update({
            where: {playerId : player.playerId},
            data: {division: "Legend"},
          })
        }
      }
    }
  }

  async updateRank(): Promise<void> {
    const players = await this.prisma.player.findMany({
      orderBy: {
        eloRating: 'desc',

      }
    });

    let newRank = 1;

    for (const player of players){
      await this.prisma.player.update({
        where: { playerId : player.playerId},
        data: {rank: newRank },
      })
      newRank++;
    }
  }

}
