import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
    //dependency injection
    constructor(private prisma: PrismaService) {
        
    }

    signUp(dto: AuthDto) {
        return 'SignUp Controller Method';
    }

    signIn(){
        return 'SignIn Controller Method';
    }
}