import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { FindUserDto } from "./user.dto";
import { LocalAuthGuard } from "../auth/guards/local-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { User } from "../db/schema/db.schema";

@Controller('users')
export class UserController {
    constructor (private userService: UserService) {}

    @UseGuards(LocalAuthGuard)
    @Get('')
    async listUsers(@Query() query: FindUserDto, @Req() req: any) {
        console.log(req.user)
        const pagination = {
            page: query.page,
            perPage: query.perPage,
        } as const;
        let filterOptions: any = {
            username: query.username,
            email: query.email,
            role: query.role,
        }
        filterOptions = Object.fromEntries(
            Object.entries(filterOptions).filter(([_, value]) => value !== undefined)
        )
        return await this.userService.find({ 
            filter: filterOptions,
            pagination,
        })
    }
}