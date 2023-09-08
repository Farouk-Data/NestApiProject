import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    //dependency injection
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService) {
        
    }
    // async funct cs it calls prisma asynchronosly
    async signUp(dto: AuthDto) {
        //generate password hash
        const hash = await argon.hash(dto.passwordHash);

        //handle errors related to use of unique credentials (prisma/nest error handling)
        try {
            //save the user in the db
            const user = await this.prisma.player.create({
                data: {
                    eloRating: 1500,
                    numOfGames: 0,
                    rank: 1,
                    email: dto.email,
                    passwordHash: hash,
                },
                //only return these
                select: {
                    playerId: true,
                    eloRating: true,
                    numOfGames: true,
                    rank: true,
                    email: true,
                    createdAt: true, 
                    division: true,
                    rankBoard: true,
                }
            });
            //or
            // delete user.hash;

            //return the saved user
            return (user);
            // return 'SignUp Controller Method';
        }
        catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException ('Credentials Taken!')
                }
            }
            throw (error);
        }        
    }

    async signIn(dto: AuthDto){

        //find the user by email
        const user = await this.prisma.player.findUnique({ where: { email : dto.email  }})

        //if user does not exist throw exception
        if (!user) {
            throw new NotFoundException(`No User Found For Email: ${dto.email}`);
        }

        //compare passwords
        const isPasswordValid = await argon.verify(user.passwordHash, dto.passwordHash);

        //if passwords incorrect throw exception
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid Password');
        }

        //if all is well send back the user without the password field
        delete user.passwordHash;
        
        return (user);
    }
}