import { IsEmail, IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { PAGINATION_TAKE_LIMIT } from "./user.constants";

export class OffsetPaginationDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number = 1;
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(PAGINATION_TAKE_LIMIT)
    perPage: number = 20;
}

export class FindUserDto extends OffsetPaginationDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    role: string;

}
