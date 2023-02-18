import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post
  // UseInterceptors,
} from '@nestjs/common'
import { IsNotEmpty, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
import { UsersService } from '@/users/users.service'
import { LogsService } from './logs.service'

class LogsDto {
  @IsString()
  @IsNotEmpty()
  msg: string

  @IsString()
  id: string

  @IsString()
  name: string
}

class PublicLogsDto {
  @Expose()
  msg: string

  @Expose()
  name: string
}

@Controller('logs')
export class LogsController {
  constructor(
    private readonly logsService: LogsService,
  ) {}

  @Get(':id')
  getUserLogs(@Param('id') id: string) {
    return this.logsService.findUserLogs(id)
  }

  @Post()
  postTest(@Body() dto: LogsDto) {
    return dto
  }
}