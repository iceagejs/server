import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import * as nanoid from 'nanoid'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    // user.user_id = this.generateUserId()
    console.log(user)
    const userTmp = await this.usersRepository.create(user)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.usersRepository.save(userTmp)
    return result
  }

  findAll() {
    return this.usersRepository.find()
  }

  async findByUsername(username: string) {
    const { user_id } = await this.usersRepository.findOne({where: {username}})
    return this.usersRepository.findOne({where: {user_id}})
  }

  findOne(id: string) {
    return this.usersRepository.findOne({where: {user_id: id}})
  }

  update(id: string, user: User) {
    return this.usersRepository.update(id, user)
  }

  remove(id: string) {
    return this.usersRepository.delete(id)
  }

  findProfile(uid: string) {
    return this.usersRepository.findOne({
      where: {
        user_id: uid
      },
      relations: ['profile']
    })
  }

  /**
   * 生成用户id
   * @param len 生成的id长度
   * @returns { string }
   */
  generateUserId(len = 30) {
    const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const id = nanoid.customAlphabet(str, len)
    return id()
  }
}
