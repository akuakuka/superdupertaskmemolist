import {Entity,PrimaryGeneratedColumn, Column, BaseEntity,JoinColumn,CreateDateColumn,UpdateDateColumn, OneToOne, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Plugin extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    pluginID: string;

    @Column({ nullable: true })
    type?: string;

    @Column({ nullable: true })
    chatID?: string;

    @ManyToOne(()=> User, user => user.userID)
    @JoinColumn({ name: "userID"})
    user: User;

    @Column({ nullable: true })
    userID: string;

  @Column()
  @CreateDateColumn()
  createdDate: Date;

  @Column()
  @UpdateDateColumn()
  updatedDate: Date;

}
