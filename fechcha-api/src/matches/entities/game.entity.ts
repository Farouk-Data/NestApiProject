import { Server, Socket } from "socket.io";
import { MatchesService } from "../matches.service";
import { PrismaService } from "src/prisma/prisma.service";
import { Match, PrismaClient } from "@prisma/client";


//table of games
export class Game{

}

export class GamesCollection{
    games: Game[] = [];

    constructor(
        private  server: Server,
        private  matchesService: MatchesService,
      ) {}
    removePlayer(client: Socket){

    }
    
    connectPlayer(match: Match, userId: number, client: Socket){

    }
}