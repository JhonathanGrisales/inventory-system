import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./roles.entity";
import { Status } from "./status.entity";

@Entity({ schema: "authentication", name: "users" })
export class Users {
  @PrimaryGeneratedColumn()
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


  @ManyToOne(() => Status, status => status.users)
  @JoinColumn({ name: 'status_id' })
  status: Status;

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
