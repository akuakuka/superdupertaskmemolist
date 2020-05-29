import {Entity, PrimaryGeneratedColumn, Column,Generated, BaseEntity,OneToOne, OneToMany,ManyToOne, CreateDateColumn,UpdateDateColumn,JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Social extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    socialID: string;
  
    @Column()
    socialType: string;

    @Column()
    socialProfileID: string;

@ManyToOne(()=> User, user => user.socials)
userID: User;

@CreateDateColumn()
createdAt: Date;


@UpdateDateColumn()
updatedAt: Date;
 
}