import { Controller, InternalServerErrorException, Post, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { User } from "../db/schema/db.schema";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Request, Response} from "express";

@Controller('auth')
export class AuthController {
    constructor () {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
        return req.user;
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        req.logout((err) => {
            if (err) {
                throw new InternalServerErrorException()
            }
            return res.json({
                "message": "Logged out successfully"
            }).status(200)
        })
    }
}