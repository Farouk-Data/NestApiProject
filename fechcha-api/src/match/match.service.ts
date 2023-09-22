import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { resolve } from 'path';


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

  // async update

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
    
    // Create a match in the database
    await this.prisma.match.create({
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
    
    return 'Match created between players ' + player1Id + ' and ' + player2Id;
  }

  updateEloRating(){

  }

  findAll() {
    return `This action returns all match`;
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
