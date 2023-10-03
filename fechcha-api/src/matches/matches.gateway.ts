import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayDisconnect, OnGatewayInit, WebSocketServer, ConnectedSocket, WsException } from '@nestjs/websockets';
import { MatchesService } from './matches.service';
import { Server } from 'socket.io';
import { GamesCollection } from './entities/game.entity';
import { getUser } from 'src/decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class MatchesGateway implements  OnGatewayDisconnect, OnGatewayInit{
    @WebSocketServer()
    server: Server;
    games: GamesCollection;

constructor(private matchesService: MatchesService){}

afterInit(): any {
    this.games = new GamesCollection(this.server, this.matchesService);
}

handleDisconnect(client: any) {
    this.games.removePlayer(client);
}

// @UseGuards()
@SubscribeMessage('joinMatch')
async joinMatch(
    @getUser() user,
    @ConnectedSocket() client: Socket,
    @MessageBody('matchId') matchId: number,
){
    const match = await this.matchesService.findOneById(matchId);
    if (!match)
        throw new WsException("Match Not Found!");
    if (match.winnerId !== null)
        throw new WsException("Match is Over!");

    this.games.connectPlayer(match, user.id, client);
    }
}

//can add event handler to update the move of the game