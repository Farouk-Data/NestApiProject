import {ConnectedSocket, 
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { queueArr } from './entities/queue.entity';
import { getUser } from 'src/decorators/get-user.decorator';
import { MatchesService } from 'src/matches/matches.service';

@WebSocketGateway()
export class MatchMakingGateway implements OnGatewayDisconnect{
  @WebSocketServer()
  queue: queueArr = new queueArr();
  server: Server;

  constructor(private matchesService: MatchesService){}

  handleDisconnect(client: any) {
    this.queue.deletePlayer(client);
  }

  //use the right Auth for the guard to authenticate the client
  // @UseGuards(Auth)  => to do
  @SubscribeMessage('makeMatch')
  async makeMatch(
    @getUser() user, //current user
    @ConnectedSocket() client: Socket,
  ){
    //possible problem if user and adversary are the same
    const adversary = this.queue.players[0];
    if (adversary) //if you found an already user waiting in the queue
    {
      this.queue.deletePlayerById(adversary.id);

      //create a match between user and adversary => to do
      const match = await this.matchesService.create(
        user.id,
        adversary.id,
      );

      //emit event to client
      this.server.to(client.id).emit('matchingFound', {id: match.matchId});

      //emit event to adversary
      this.server.to(adversary.socketId).emit('matchingFound', {id: match.matchId});
    }
    else{
      this.queue.addPlayer(user.id, client);
    }
  }
}
