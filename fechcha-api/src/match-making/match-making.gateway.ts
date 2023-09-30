import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { MatchMakingService } from './match-making.service';
import { CreateMatchMakingDto } from './dto/create-match-making.dto';
import { UpdateMatchMakingDto } from './dto/update-match-making.dto';

@WebSocketGateway()
export class MatchMakingGateway {
  constructor(private readonly matchMakingService: MatchMakingService) {}

  @SubscribeMessage('createMatchMaking')
  create(@MessageBody() createMatchMakingDto: CreateMatchMakingDto) {
    return this.matchMakingService.create(createMatchMakingDto);
  }

  @SubscribeMessage('findAllMatchMaking')
  findAll() {
    return this.matchMakingService.findAll();
  }

  @SubscribeMessage('findOneMatchMaking')
  findOne(@MessageBody() id: number) {
    return this.matchMakingService.findOne(id);
  }

  @SubscribeMessage('updateMatchMaking')
  update(@MessageBody() updateMatchMakingDto: UpdateMatchMakingDto) {
    return this.matchMakingService.update(updateMatchMakingDto.id, updateMatchMakingDto);
  }

  @SubscribeMessage('removeMatchMaking')
  remove(@MessageBody() id: number) {
    return this.matchMakingService.remove(id);
  }
}
