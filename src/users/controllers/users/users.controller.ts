import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { createUserDto, updateUserDto } from 'src/users/dtos/createUser.dto';
import { createUserPostDto } from 'src/users/dtos/createUserPost.dto';
import { createUserProfileDto } from 'src/users/dtos/createUserProfile.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
     constructor(private userService:UsersService){}
     @Get()
     async getUser(){
          return await this.userService.findUser();
     }

     @Post()
     async createUser(@Body() createUser:createUserDto){
          const user = await this.userService.createUser(createUser);
          if(user){
               return {
                    success:true,
                    message:'create user success',
                    user
               }
          }
     }

     @Put(':id')
     async updateUser(@Param('id',ParseIntPipe) id:number , @Body() updateUser:updateUserDto){
          const user = await this.userService.updateUser(id,updateUser);
          if(user){
               return {
                    success:true,
                    message:'update user success'
               }
          }
     }

     @Delete(':id')
     async deleteUser(@Param('id') id:number){
          const user = await this.userService.deleteUser(id);
          if(user){
               return {
                    success:true,
                    message:'delete user success'
               }
          }
     }

     @Post(':id/profile')
     createUserProfile(@Param('id') id:number , @Body() createUserProfile:createUserProfileDto){
          return this.userService.createUserProfile(id,createUserProfile) ;    
     }

     @Post(':id/post')
     createUserPost(@Param('id') id:number , @Body() createUserPost:createUserPostDto){
          return this.userService.createUserPost(id,createUserPost);
     }

     
}
