import { Injectable } from '@nestjs/common';
import { CreateRankDto } from './dto/create-rank.dto';
import { UpdateRankDto } from './dto/update-rank.dto';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RankService {

  constructor(
    private prisma: PrismaService) {
  }
  async getRank(){
    return this.prisma.user.findMany();
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
