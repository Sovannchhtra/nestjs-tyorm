import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorms/entities/Post';
import { Profile } from 'src/typeorms/entities/Profile';
import { User } from 'src/typeorms/entities/User';
import { createUserParam, createUserPostParam, createUserProfileParam, updateUserParam } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
     constructor(
          @InjectRepository(User) private userRepository:Repository<User>,
          @InjectRepository(Profile) private profileRepository:Repository<Profile>,
          @InjectRepository(Post) private postRepository:Repository<Post>
     ){}
     findUser(){
          return this.userRepository.find({ relations:['profile','posts'] });
     }

     createUser(userDetail:createUserParam){
          const newUser = this.userRepository.create({
               ...userDetail,createAt:new Date()
          })
          return this.userRepository.save(newUser);
     }

     updateUser(id:number , updateUserDetail:updateUserParam){
          return this.userRepository.update({ id },{ ...updateUserDetail });
     }

     deleteUser(id:number){
          return this.userRepository.delete({id});
     }

     async createUserProfile(id:number , createUserProfileDetail:createUserProfileParam){
          const user = await this.userRepository.findOneBy({id});
          if(!user){
               throw new HttpException('user not found , cannot create profile',HttpStatus.BAD_REQUEST);
          }
          const newProfile = this.profileRepository.create(createUserProfileDetail);
          const saveProfile = await this.profileRepository.save(newProfile);
          user.profile = saveProfile;
          return this.userRepository.save(user);
     }

     async createUserPost(id:number, createUserPostDetail:createUserPostParam){
          const user = await this.userRepository.findOneBy({id});
          if(!user){
               throw new HttpException('user not found , cannot create profile',HttpStatus.BAD_REQUEST);
          }
          const newPost = this.postRepository.create({...createUserPostDetail,user});
          return await this.postRepository.save(newPost);
     }
}
