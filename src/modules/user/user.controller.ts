import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "../auth/guards/auth.guard";
import { FindUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor (private userService: UserService) {}

    @UseGuards(JWTAuthGuard)
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