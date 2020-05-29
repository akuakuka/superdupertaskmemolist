import {Entity,PrimaryGeneratedColumn, Column, BaseEntity,JoinColumn,CreateDateColumn,UpdateDateColumn, OneToOne, ManyToOne} from "typeorm";
import { User } from "./User";
import { Plugin } from "./Plugin";


const createVerifyCode = () => {
    return Math.floor(Math.random()*90000) + 10000;
}
const createExpireDate = () => {
    let dt = new Date();
    dt.setMinutes( dt.getMinutes() + 15 );
return dt
}
@Entity()
export class VerifyPlugin extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    VerifyPluginID: string;

    @Column({ nullable: true })
    type?: string;

    @Column({ default: createVerifyCode() })
    code: string;

    @Column({ default: createExpireDate() })
    expires: Date;

    @ManyToOne(()=> Plugin, plugin => plugin.pluginID)
    @JoinColumn({ name: "pluginID"})
    pluginID: Plugin;

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
