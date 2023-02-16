import { Roles } from '@/roles/entities/roles.entity'
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: string

  @Column()
  username: string

  @Column()
  password: string

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({name: 'user_roles', joinColumn: {name: 'user_id'}, inverseJoinColumn: {name: 'role_id'}})
  roles: Roles[]
}
