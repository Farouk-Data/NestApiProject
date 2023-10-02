import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Player, matchType } from '@prisma/client';

@Injectable()
export class MatchesService {
  
  constructor(
    private prisma: PrismaService
  ){}

  async create(userId: number, adverId: number, typeM: matchType){
    const match = await this.prisma.match.create({
      data: {
        homeId: userId,
        adversaryId: adverId,
        type: typeM,
        state: 0,
      }
    });
    
    return (match);
  }
}
