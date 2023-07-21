import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
    //dependency injection
    constructor(private prisma: PrismaService) {
        
    }
    // async funct cs it calls prisma asynchronosly
    async signUp(dto: AuthDto) {
        //generate password hash
        const hash = await argon.hash(dto.passwordHash);
        
        //handle errors related to use of unique credentials (prisma/nest error handling)
        try {
            //save the user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    passwordHash: hash,
                },
                //only return these
                select: {
                    id: true,
                    email: true,
                    createdAt: true
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

    signIn(){
        return ('SignIn Controller Method');
    }
}