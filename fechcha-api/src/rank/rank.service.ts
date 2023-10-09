import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { MatchesService } from 'src/matches/matches.service';

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms);
  })
}

async function play() {
  console.log("Game Started!!");
  await sleep(5000);
  console.log("Game Finished");
}



@Injectable()
export class RankService {
  
  //dependcy injection
  constructor(
    private prisma: PrismaService,
    private matches: MatchesService,
    ) {}

    getRandomDistinctIndices(max: number): number[] {
      const indices = [];
      while (indices.length < 2) {
        const index = Math.floor(Math.random() * max);
        if (!indices.includes(index)) {
          indices.push(index);
        }
      }
      return indices;
    }

    async playMatch() {
      const players = await this.prisma.player.findMany();
      if (players.length < 2) {
        return 'Not enough players to play a match';
      }
      else  
        console.log("There's enough players");
  
      // Randomly select two distinct player indices
      const [player1Index, player2Index] = this.getRandomDistinctIndices(players.length);
  
      // Get the selected players' IDs
      const player1Id = players[player1Index].playerId;
      const player2Id = players[player2Index].playerId;
  
      const match = this.matches.create(player1Id, player2Id);
      // play();
      await this.prisma.match.update({
        where:{
          matchId: (await match).matchId
        },
        data:{
          winnerId: player2Id
        },
      })
      this.updateElo((await match).matchId);
      return this.getAllRank();
    }

    async getAllRank(){
      return this.prisma.player.findMany();
    }

    // async getOneRank(id: number) {
    //   const player = await this.prisma.player.findUnique({
    //     where: { playerId: id },
    //   });
    //   return (player?.rank);
    // }
  
    async getNumOfMatchesPlayed(id: number): Promise<any>{
      const player = await this.prisma.player.findUnique({
        where: {playerId : id },
      });
      return (player?.numOfGames);
    }
  
    async getEloScore(id: number): Promise<any>{
      const player = await this.prisma.player.findUnique({
        where: { playerId : id },
      });
      return (player?.eloRating);
    }
  
    async getNumOfWins(id: number): Promise<any>{
      const player = await this.prisma.player.findUnique({
        where: {playerId : id},
        include:{
          matches3: {
            where: {
              winnerId: id,
            }
          }
        }
      });
      return (player?.matches3.length);
    }

    async getProvElo(){
      return this.prisma.player.findMany({
        where: {
          rankBoard: 'Provisional',
        },
        orderBy: {
          eloRating: 'desc',
        }
      });
    }
  
    async getEstaElo(){
      return this.prisma.player.findMany({
        where: {
          rankBoard: 'Established',
        },
        orderBy: {
          eloRating: 'desc',
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
    const estaPlayers = await this.getEstaElo();
    const provPlayers = await this.getProvElo();

    let newRank = 1;

    console.log(estaPlayers.length);
    console.log("HERE!!!!!!!!!!");
    if (estaPlayers.length !== 0){
      for (const player of estaPlayers){
        await this.prisma.player.update({
          where: { playerId : player.playerId,
            rankBoard: "Established"},
            data: {rank: newRank },
          })
          newRank++;
        }
      }
    console.log("HERE!!!!!!!!!!");
    console.log(provPlayers.length);
    if (provPlayers.length !== 0){
      for (const player of provPlayers){
        await this.prisma.player.update({
          where: { playerId : player.playerId,
            rankBoard: "Provisional"},
            data: {rank: newRank },
          })
          newRank++;
          console.log(player.eloRating, " => ", player.rank);
      }
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
    const home = await this.prisma.player.findUnique({
      where: {
        playerId: match.homeId,
      }
    })

    const adversary = await this.prisma.player.findUnique({
      where:{
        playerId: match.adversaryId,
      }
    })
   
    let s1 = 0, s2 = 0, newR1 = 0, newR2 = 0;

    this.incrementNumOfGames(match.homeId);
    this.incrementNumOfGames(match.adversaryId);
    
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
