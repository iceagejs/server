import { UsersModule } from '@/users/users.module'
import { UsersService } from '@/users/users.service'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'
import { Logs } from './entities/logs.entity'
import { LogsController } from './logs.controller'
import { LogsService } from './logs.service'

function createDailyRotateTrasnport(level: string, filename: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  })
}
@Module({
  imports: [
    TypeOrmModule.forFeature([Logs]),
    UsersModule
  ],
  controllers: [LogsController],
  providers: [LogsService]
})
export class LogsModule {}