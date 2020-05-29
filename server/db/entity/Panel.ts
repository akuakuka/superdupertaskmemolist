import {Entity,PrimaryGeneratedColumn,Generated, Column, BaseEntity,JoinColumn,CreateDateColumn,UpdateDateColumn, OneToOne, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import { Memo } from "./Memo";

@Entity()
export class Panel extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    panelID: string;

    @Column({ nullable: true })
    title?: string;

    @Column({ default: false})
    default?: boolean;

    @ManyToOne(()=> User, user => user.userID)
    @JoinColumn({ name: "userID"})
    userID: User;

    @OneToMany(() => Memo, memo => memo.panelID)
    memos: Memo[];

  @Column()
  @CreateDateColumn()
  createdDate: Date;

  @Column()
  @UpdateDateColumn()
  updatedDate: Date;

}
