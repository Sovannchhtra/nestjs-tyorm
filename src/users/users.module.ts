import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorms/entities/User';
import { Profile } from 'src/typeorms/entities/Profile';
import { Post } from 'src/typeorms/entities/Post';

@Module({
  imports:[TypeOrmModule.forFeature([User,Profile,Post])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
