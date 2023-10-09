import { IsEmail, IsNotEmpty, IsString } from "class-validator"

//using class validators
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    passwordHash: string

    eloRating: number
    numOfGames: number
    // rank: number
    
}