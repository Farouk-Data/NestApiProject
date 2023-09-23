import { Injectable } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';
import { PrismaService } from "src/prisma/prisma.service";

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

  create(createRankDto: CreateRankDto) {
    return 'This action adds a new rank';
  }

  findAll() {
    return `This action returns all rank`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rank`;
  }

  update(id: number, updateRankDto: UpdateRankDto) {
    return `This action updates a #${id} rank`;
  }

  remove(id: number) {
    return `This action removes a #${id} rank`;
  }
}
