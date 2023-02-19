import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'
import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Logs } from './entities/logs.entity'

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
     private readonly usersService: UsersService,
  ) {}

  async findUserLogs(id: string) {
    const user = await this.usersService.findOne(id)
    return this.logsRepository.find({
      where: {user},
      relations: ['user']
    })
  }
}