import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity({ schema: "authentication", name: "roles" })
export class Roles {
  @PrimaryColumn()
  uid: string;

  @Column()
  name: string;

  @OneToMany(() => Users, user => user.role)
  users: Users[];

}
