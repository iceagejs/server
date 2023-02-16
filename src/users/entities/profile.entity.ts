import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"


@Entity()
export class Profile {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  gender: string

  @Column()
  birthday: string

  @Column()
  nickname: string
  
  @Column()
  address: string

  @Column()
  avatar: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  is_delete: number

  @Column()
  status: number

  @Column()
  last_login_time: string

  @Column()
  create_time: string

  @Column()
  update_time: string

  @Column()
  delete_time: string

  @Column()
  last_login_ip: string

  @OneToOne(() => User, user => user.profile)
  @JoinColumn({name: 'user_id'})
  user: User
}