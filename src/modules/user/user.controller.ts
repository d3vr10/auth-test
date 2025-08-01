import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { FindUserDto } from "./user.dto";

@Controller('users')
export class UserController {
    constructor (private userService: UserService) {}

    @Get('')
    async listUsers(@Query() query: FindUserDto) {
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