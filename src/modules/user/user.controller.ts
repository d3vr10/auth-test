import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor (private userService: UserService) {}
    async listUsers() {

    }

    @Get('')
    async getUserByEmail(@Query('email') email: string) {
        return await this.userService.getUserByEmail(email)
    }
}