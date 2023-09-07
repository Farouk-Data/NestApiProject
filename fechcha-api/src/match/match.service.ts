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
    private prisma: PrismaService) {
  }

  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  async update

  async playMatch(id: number){
    play();
    const currentPlayer = await this.prisma.player.findUnique({
      where: { id },
      select: { numOfGames: true },
    });

    if (!currentPlayer) {
      throw new Error(`Player with ID ${id} not found`);
    }
    let newNum = currentPlayer.numOfGames + 1;
    const updatedPlayer = await this.prisma.player.update({
      where: { id },
      data: { numOfGames: newNum },
    });

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
