import {
    ConflictException,
    InternalServerErrorException
} from "@nestjs/common"
import { CustomRepository } from "src/database/typeorm-ex.decorator"
import { Repository } from "typeorm"
import { CreateUserDto } from "./dtos/create-user.dto"
import { UserRole } from "./user-roles.enum"
import { User } from "./user.entity"
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';



@CustomRepository(User)
export class UserRepository extends Repository<User> {
    public async createUser(createUserDto: CreateUserDto, role: UserRole) {
        const {
            email,
            name,
            password
        } = createUserDto;
        const user = new User()

        user.email = email;
        user.name = name;
        user.password = password;
        user.status = true;
        user.role = role;
        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);


        try {
            await user.save();
            delete user.password;
            delete user.salt
            return user;
        }
        catch (error) {
            if (error.code.toString() === '23505') {
                throw new ConflictException('E-mail already in use');
            }
            else {
                throw new InternalServerErrorException('Internal Server Error Exception:' + error);
            }


        }
    }
    private async hashPassword(password: string, hash: string): Promise<string> {
        return bcrypt.hash(password, hash);
    }
}