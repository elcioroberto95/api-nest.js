import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRole } from './user-roles.enum';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  async createUserAdmin(createUserDTO: CreateUserDto): Promise<User> {
    if (createUserDTO.password != createUserDTO.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');

    }
    else {
      return this.userRepository.createUser(createUserDTO, UserRole.ADMIN);
    }
  }

}