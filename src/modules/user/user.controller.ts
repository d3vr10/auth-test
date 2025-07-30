import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserQueryDto } from "./user.dto";

@Controller('users')
export class UserController {
    constructor (private userService: UserService) {}

    @Get('')
    async listUsers(@Query() queryParams: UserQueryDto) {
    }
}