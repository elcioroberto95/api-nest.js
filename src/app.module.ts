import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { TypeOrmExModule } from './database/typeorm-ex.module';
import { UsersModule } from './users/users.module';
import { UserRepository } from './users/users.repository';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
