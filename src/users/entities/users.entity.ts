import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Roles } from "./roles.entity";

@Entity({ schema: "authentication", name: "users" })
export class Users {
  @PrimaryColumn()
  uid: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @ManyToOne(() => Roles, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @Column()
  status: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @Column()
  last_login: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}
