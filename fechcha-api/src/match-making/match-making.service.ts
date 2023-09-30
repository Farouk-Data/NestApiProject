import { Injectable } from '@nestjs/common';
import { CreateMatchMakingDto } from './dto/create-match-making.dto';
import { UpdateMatchMakingDto } from './dto/update-match-making.dto';

@Injectable()
export class MatchMakingService {
  create(createMatchMakingDto: CreateMatchMakingDto) {
    return 'This action adds a new matchMaking';
  }

  findAll() {
    return `This action returns all matchMaking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matchMaking`;
  }

  update(id: number, updateMatchMakingDto: UpdateMatchMakingDto) {
    return `This action updates a #${id} matchMaking`;
  }

  remove(id: number) {
    return `This action removes a #${id} matchMaking`;
  }
}
