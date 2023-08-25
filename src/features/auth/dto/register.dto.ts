import { IsDefined, IsEmail, IsNotEmpty, IsString, Length } from "class-validator"
import { IsConfirmed } from "src/validators/confirmed.validator"

export class RegisterDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string

    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsDefined()
    @IsString()
    @Length(6, 16)
    password: string

    @IsDefined()
    @IsString()
    @IsConfirmed('password_confirmation')
    password_confirmation: string
}