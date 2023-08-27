import { IsDefined, IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateBalanceDto {
    @IsDefined()
    @IsString()
    name: string

    @IsOptional()
    @IsInt()
    @IsPositive()
    balance: number
}