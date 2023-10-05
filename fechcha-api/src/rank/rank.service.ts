import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
// import { Player } from '@prisma/client'
import { MatchesService } from 'src/matches/matches.service';

@Injectable()
export class RankService {
  
  //dependcy injection
  constructor(
    private prisma: PrismaService,
    private matches: MatchesService,
    ) {}

    async getAllRank(){
      return this.prisma.player.findMany();
    }

    async getOneRank(id: number){
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

    async incrementNumOfGames(userId: number){
      const player = await this.prisma.player.findUnique({
        where:{ playerId: userId},
      })
      const uptPlayer = await this.prisma.player.update({
        where:{ playerId: userId},
        data: {
          numOfGames: player.numOfGames + 1,
        }
    })
  }
  
  async newElo(newElo: number, userId: number){
    const player = await this.prisma.player.findUnique({
      where:{ playerId: userId},
    })
    const uptPlayer = await this.prisma.player.update({
      where:{ playerId: userId},
      data: {
        eloRating: newElo,
      }
    })
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

  async updateElo(matchId: number){
    const match = await this.matches.findOneById(matchId);
    const players = await this.prisma.player.findMany();
    const home = players[match.homeId];
    const adversary = players[match.adversaryId];
   
    let s1 = 0, s2 = 0, newR1 = 0, newR2 = 0;

    this.incrementNumOfGames(home.playerId);
    this.incrementNumOfGames(adversary.playerId);
    
    if (home.rankBoard == "Provisional" && adversary.rankBoard == "Provisional"){
      if (home.playerId == match.winnerId){
        s1 = 1;
        s2 = -1;
      }
      else if (adversary.playerId == match.winnerId){
        s1 = -1;
        s2 = 1;
      }
      newR1 = ((home.eloRating*home.numOfGames + (home.eloRating + adversary.eloRating)/2) + 100*s1) / (home.numOfGames + 1)
      newR2 = ((home.eloRating*home.numOfGames + (home.eloRating + adversary.eloRating)/2) + 100*s2) / (home.numOfGames + 1)
    }

    else if (home.rankBoard == "Provisional" && adversary.rankBoard == "Established"){
      if (home.playerId == match.winnerId){
        s1 = 1;
        s2 = 0;
      }
      else if (adversary.playerId == match.winnerId)
      {
        s1 = -1;
        s2 = 1;
      }
      newR1 = (home.eloRating*home.numOfGames + adversary.eloRating + 200*s1) / (home.numOfGames + 1)
      newR2 = home.eloRating + (32*(adversary.numOfGames/20))*(s2 - 1/(1 + Math.pow(10, ((adversary.eloRating - home.eloRating)/400))))
    }
    
    else if (home.rankBoard == "Established" && adversary.rankBoard == "Provisional"){
      if (home.playerId == match.winnerId){
        s1 = 1;
        s2 = -1;
      }
      else if (adversary.playerId == match.winnerId){
        s1 = 0;
        s2 = 1;
      } 
      newR1 = home.eloRating + (32*(adversary.numOfGames/20))*(s2 - 1/(1 + Math.pow(10, ((adversary.eloRating - home.eloRating)/400))))
      newR2 = (home.eloRating*home.numOfGames + adversary.eloRating + 200*s1) / (home.numOfGames + 1)
    }

    else if (home.rankBoard == "Established" && adversary.rankBoard == "Established"){
      if (home.playerId == match.winnerId){
        s1 = 1;
        s2 = 0;
      }
      else if (adversary.playerId == match.winnerId){
        s1 = 0;
        s2 = 1;
      }
      newR1 = home.eloRating + 32*(s1 - 1/(1 + Math.pow(10, ((adversary.eloRating - home.eloRating)/400))))
      newR2 = home.eloRating + 32*(s2 - 1/(1 + Math.pow(10, ((adversary.eloRating - home.eloRating)/400))))
    }
    this.newElo(newR1, home.playerId);
    this.newElo(newR2, adversary.playerId);
    this.updateRank();
    this.updateRankBoard();
    this.updateDivision();
  }
}
