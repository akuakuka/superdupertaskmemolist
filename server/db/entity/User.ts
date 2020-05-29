import {Entity, Unique,PrimaryGeneratedColumn,Generated, BaseEntity,Column, OneToMany,CreateDateColumn,UpdateDateColumn} from "typeorm";
import * as bcrypt from "bcryptjs";
import {Memo} from "./Memo"
import { Social } from "./Social";
import {Plugin} from "./Plugin"
import { Panel } from "./Panel";
import { Location } from "./Location";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {


  @PrimaryGeneratedColumn("uuid")
  userID: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({ nullable: true })
    password: string;

    @OneToMany(() => Social, Social => Social.userID, {
      cascade: true
    })
    socials: Social[];

    @OneToMany(() => Memo, memo => memo.userID)
    memos: Memo[];

    @OneToMany(() => Panel, panel => panel.userID)
    panels: Panel[];

    @OneToMany(() => Plugin, plugin => plugin.userID)
    plugins: Plugin[];

    @OneToMany(() => Location, location => location.userID)
    locations: Location[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

    hashPassword(passwordToHash:string) {
        let hashedPW = bcrypt.hashSync(passwordToHash, 12);
        return hashedPW;
      }
    
      checkPassword(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }
}
