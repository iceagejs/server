import { Logs } from '@/logs/entities/logs.entity'
import { Roles } from '@/roles/entities/roles.entity'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from './profile.entity'

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  user_id: string

  @Column()
  username: string

  @Column()
  password: string

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({name: 'user_roles', joinColumn: {name: 'user_id'}, inverseJoinColumn: {name: 'role_id'}})
  roles: Roles[]

  @OneToMany(() => Logs, (logs) => logs.user, {cascade: true})
  logs: Logs[] 

  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile
}