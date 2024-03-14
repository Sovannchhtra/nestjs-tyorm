import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm' 
import { User } from './typeorms/entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './typeorms/entities/Profile';
import { Post } from './typeorms/entities/Post';
@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'',
    database:'db_nestjs',
    entities:[User,Profile,Post],
    synchronize:true
  }), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
