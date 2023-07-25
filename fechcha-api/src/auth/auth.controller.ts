import  { Controller, Get, Post, Put, Delete, Req, Body } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
// import 

// /auth
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    //endpoints for service methods
    @Get()
    welcomeGet() : string {
        return "1337 BackEnd NestJs API!";
    }
    // /auth/signup
    @Post('signup')
    //creating the user
    //this will get the right body whether using express or fastify
    signUp(@Body() dto: AuthDto ) {
        console.log(dto);
        return this.authService.signUp(dto);
    }
     
    // /auth/signin
    @Post('signin')
    signIn(@Body() dto: AuthDto){
        return  this.authService.signIn(dto);
    }
}