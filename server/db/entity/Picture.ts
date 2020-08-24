import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from "typeorm";
import { User } from "./User";
import { Memo } from "./Memo";

@Entity()
export class Picture extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  pictureID: string;

  @Column({ nullable: true })
  pictureURL: string;


  @ManyToOne(() => User, user => user.userID)
  @JoinColumn({ name: "userID" })
  user: User;
  
  @OneToOne(()=> Memo, memo => memo.memoID)
  @JoinColumn({ name: "memoID"})
  memo: Memo;

  @Column({ nullable: true })
  memoID: string;

  @Column({ nullable: true })
  userID: string;

  @Column()
  @CreateDateColumn()
  createdDate: Date;

  @Column()
  @UpdateDateColumn()
  updatedDate: Date;

}
