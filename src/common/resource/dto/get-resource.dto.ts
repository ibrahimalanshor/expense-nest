import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, ValidateNested } from "class-validator";

export class ResourcePageDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    size: number

    @IsOptional()
    @IsInt()
    @IsPositive()
    number: number
}
export class GetResourceDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => ResourcePageDto)
    page: ResourcePageDto
}