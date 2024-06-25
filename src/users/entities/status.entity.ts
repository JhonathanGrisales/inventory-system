


import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity({ schema: "authentication", name: "status" })
export class Status {
    @PrimaryGeneratedColumn()
    uid: string;
  
    @Column()
    name: string;

    @OneToMany(() => Users, user => user.status)
    users: Users[];


}


