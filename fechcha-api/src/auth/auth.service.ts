import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {
        
    }

    signUp(){
        return 'SignUp Controller Method';
    }

    signIn(){
        return 'SignIn Controller Method';
    }
}