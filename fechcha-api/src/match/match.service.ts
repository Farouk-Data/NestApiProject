import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { RankService } from 'src/rank/rank.service';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { resolve } from 'path';
import { Console } from 'console';


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
export class MatchService {
  constructor(
    private prisma: PrismaService,
    private rank: RankService,
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

  // async updateq

  async playMatch() {
    const players = await this.prisma.player.findMany();
    if (players.length < 2) {
      return 'Not enough players to play a match';
    }
    
    // Randomly select two distinct player indices
    const [player1Index, player2Index] = this.getRandomDistinctIndices(players.length);
    
    // Get the selected players' IDs
    const player1Id = players[player1Index].playerId;
    const player2Id = players[player2Index].playerId;

    const player1 = players[player1Index];
    const player2 = players[player2Index];
    
    // Create a match in the database
    const match = await this.prisma.match.create({
      data: {
        home: {
          connect: {playerId: player1Id},
        },
        adversary: {
          connect: {playerId: player2Id},
        },
        state: 0, // Set the initial state of the match as needed
      },
    });
    play();
    let s = 0;
    //check which player won
    if (player1.rankBoard == "Provisional" && player2.rankBoard == "Provisional"){
      if (player1Id > player2Id)
        // await this.prisma.player.findUnique()
        s = 1;
      else 
        s = -1;
      let newR = ((player1.eloRating*player1.numOfGames + (player1.eloRating + player2.eloRating)/2) + 100*s) / (player1.numOfGames + 1)
    }

    if (player1.rankBoard == "Provisional" && player2.rankBoard == "Established"){
      if (player1Id > player2Id)
        s = 1;
      else 
        s = -1;
      let newR = (player1.eloRating*player1.numOfGames + player2.eloRating + 200*s) / (player1.numOfGames + 1)
    }

    if (player1.rankBoard == "Established" && player2.rankBoard == "Provisional"){
      if (player1Id > player2Id)
        s = 1;
      else 
        s = 0;
      let newR = player1.eloRating + (32*(player2.numOfGames/20))*(s - 1/(1 + Math.pow(10, ((player2.eloRating - player1.eloRating)/400))))
    }

    if (player1.rankBoard == "Established" && player2.rankBoard == "Established"){
      if (player1Id > player2Id)
        s = 1;
      else 
        s = 0;
      let newR = player1.eloRating + 32*(s - 1/(1 + Math.pow(10, ((player2.eloRating - player1.eloRating)/400))))
    }

    return 'Match created between players ' + player1Id + ' and ' + player2Id;
  }
}
