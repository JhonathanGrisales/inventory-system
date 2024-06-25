import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity({ schema: "authentication", name: "roles" })
export class Roles {
  @PrimaryGeneratedColumn()
  uid: string;

  @Column()
  name: string;

  @OneToMany(() => Users, user => user.role)
  users: Users[];

}
