import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {

    signUp(){
        return 'SignUp Controller Method';
    }

    signIn(){
        return 'SignIn Controller Method';
    }
}