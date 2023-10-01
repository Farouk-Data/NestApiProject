import {ConnectedSocket, 
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { queueArr } from './entities/queue.entity';
import { MatchService } from 'src/match/match.service';
import { getUser } from 'src/decorators/get-user.decorator';

@WebSocketGateway()
export class MatchMakingGateway implements OnGatewayDisconnect{
  @WebSocketServer()
  queue: queueArr = new queueArr();
  server: Server;

  constructor(private MatchService: MatchService){}

  handleDisconnect(client: any) {
    this.queue.deletePlayer(client);
  }

  //use the right Auth for the guard to authenticate the client
  // @UseGuards(Auth)  => to do
  @SubscribeMessage('joinMatch')
  async joinMatch(
    @getUser() user, //current user
    @ConnectedSocket() client: Socket,
  ){
    //possible problem if user and adversary are the same
    const adversary = this.queue.players[0];
    if (adversary) //if you found an already user waiting in the queue
    {
      this.queue.deletePlayerById(adversary.id);

      //create a match between user and adversary => to do
      const match = await this.MatchService.playMatch();

      //emit event to client
      this.server.to(client.id).emit('matchingFound', {id: match.id});

      //emit event to adversary
      this.server.to(adversary.socketId).emit('matchingFound', {id: match.id});
    }
    else{
      this.queue.addPlayer(user.id, client);
    }
  }
}
