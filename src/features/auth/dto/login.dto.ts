import { IsDefined, IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class LoginDto {
    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsDefined()
    @IsString()
    @Length(6, 16)
    password: string
}