import { Injectable } from "@nestjs/common";
import { UserFilter, UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor (private userRepository: UserRepository,) {}
    async find(filter: UserFilter) {
        const result = await this.userRepository.find(filter)
        return result?? []
    }
}