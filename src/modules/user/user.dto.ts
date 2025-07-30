import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserQueryDto {
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