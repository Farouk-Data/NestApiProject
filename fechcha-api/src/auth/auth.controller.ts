import  { Controller, Get, Post, Put, Delete } from "@nestjs/common";
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
    signUp(){
        return this.authService.signUp();
    }
    
    // /auth/signin
    @Post('signin')
    signIn(){
        return  this.authService.signIn();
    }
}