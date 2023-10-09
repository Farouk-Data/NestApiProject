import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchesService {
  
  constructor(
    private prisma: PrismaService,
    // private rank: RankService,
  ){}

  async create(userId: number, adverId: number){
    const match = await this.prisma.match.create({
      data: {
        homeId: userId,
        adversaryId: adverId,
      }
    });
    
    return (match);
  }

  async findOneById(matchId: number) {
    try {
      const match = await this.prisma.match.findUnique({
        where: {
          matchId: matchId,
        },
      });
      
      return match;
    } catch (error) {
      console.error('Error finding match by ID:', error);
      throw error;
    }
  }
}
