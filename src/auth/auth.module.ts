import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [AuthController],
    providers: [AuthService,UserRepository],
})
export class AuthModule { }


