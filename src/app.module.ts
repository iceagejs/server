import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WinstonModule } from 'nest-winston'
import { join } from 'path'
import * as winston from 'winston'
import 'winston-daily-rotate-file'
import AllExceptionFilter from './filters/all.exception.filter'
import { UnifyResponseInterceptor } from './interceptors/unity-response.intercepotr'
import LoggerMiddleware from './middlewares/logger.middleware'
import { getConfig } from './utils'
import { UsersModule } from './users/users.module'
import { User } from './users/entities/user.entity'
// import * as Joi from 'joi'

const config = getConfig()
@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: `logs`, // 日志保存的目录
          filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
          datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
          zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
          maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
          maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
          // 记录时添加时间戳信息
          format: winston.format.combine(
            winston.format.timestamp({
            	format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.json(),
          ),
        })
      ]
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const MYSQL_CONFIG = configService.get('MYSQL_CONFIG')
        return {
          type: MYSQL_CONFIG.type,
          host: MYSQL_CONFIG.host,
          port: MYSQL_CONFIG.port,
          username: MYSQL_CONFIG.username,
          password: MYSQL_CONFIG.password,
          database: MYSQL_CONFIG.database,
          synchronize: MYSQL_CONFIG.synchronize,
          entities: [User],
          logging: ['error']
        } as any
      }
    }),
    UsersModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    // 应用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: UnifyResponseInterceptor,
    }
  ],
})
export class AppModule {
  // 应用全局中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
