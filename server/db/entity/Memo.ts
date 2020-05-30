import { Entity, PrimaryGeneratedColumn, Generated, Column, BaseEntity, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from "typeorm";
import { User } from "./User";
import { Panel } from "./Panel";
import { Location } from "./Location";

@Entity()
export class Memo extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  memoID: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  content?: string;

  @Column({
    default: "todo"
  })
  status: string;

  @OneToOne(() => Location, location => location.locationID)
  @JoinColumn({ name: "locationID" })
  Location: Location;

  @Column({ nullable: true })
  locationID: string;

  @Column({ nullable: true })
  panelIndex: number;

  @ManyToOne(() => User, user => user.userID)
  @JoinColumn({ name: "userID" })
  userID: User;

  @Column({ nullable: true })
  panelID: string;

  @ManyToOne(() => Panel, panel => panel.panelID)
  @JoinColumn({ name: "panelID" })
  panel: Panel;

  @Column()
  @CreateDateColumn()
  createdDate: Date;

  @Column()
  @UpdateDateColumn()
  updatedDate: Date;

}
