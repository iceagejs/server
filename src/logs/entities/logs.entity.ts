import { User } from '@/users/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.logs)
  @JoinColumn({name: 'user_id'})
  user: User
  
  @Column()
  methods: string

  @Column()
  path: string

  @Column()
  data: string

  @Column()
  result: number
}