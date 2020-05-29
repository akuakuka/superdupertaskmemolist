import {Entity,PrimaryGeneratedColumn,Generated, Column, BaseEntity,JoinColumn,CreateDateColumn,UpdateDateColumn, OneToOne, ManyToOne} from "typeorm";
import { User } from "./User";
import { Memo } from "./Memo";

@Entity()
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    locationID: string;

    @Column({ nullable: true })
    longitude?: string;

    @Column({ nullable: true })
    latitude?: string;

    @Column({
        default: "locationMemo"
    })
    status: string;

    @OneToOne(()=> Memo, memo => memo.memoID)
    @JoinColumn({ name: "memoID"})
    memo: Memo;

    @Column({ nullable: true })
    memoID: string;


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
