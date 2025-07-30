import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor (private userRepository: UserRepository,) {}
    async getUserByEmail(email: string) {
        return await this.userRepository.getUserByEmail(email)
    }
}