import  { Controller, Get, Post, Put, Delete, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
// import 

// /auth
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    //endpoints for service methods
    // /auth/signup
    @Post('signup')
    //creating the user
    signUp(@Req() req: Request) {
        console.log(req);
        return this.authService.signUp();
    }
    
    // /auth/signin
    @Post('signin')
    signIn(){
        return  this.authService.signIn();
    }
}