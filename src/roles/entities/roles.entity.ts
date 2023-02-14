import { User } from '@/users/entities/user.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  describe: string

  @Column()
  status: number

  @Column()
  create_time: string

  @Column()
  update_time: string

  @Column()
  delete_time: string

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]
}