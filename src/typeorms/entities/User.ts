import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Post";

@Entity({name:"users"})
export class User{
     @PrimaryGeneratedColumn()
     id:number;

     @Column()
     username:string;

     @Column()
     password:string;

     @Column()
     createAt:Date;

     @Column({nullable:true})
     authStrategy:string;

     @OneToOne(()=>Profile)
     @JoinColumn()
     profile:Profile;

     @OneToMany(()=> Post , (post)=>post.user)
     posts:Post[];
}