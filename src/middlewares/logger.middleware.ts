import { Inject, Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
// import { Logger } from 'winston'
import { getReqMainInfo } from '@/utils'

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  // 注入日志服务相关依赖
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {    
    // 记录日志
    this.logger.log('route', {
  		req: getReqMainInfo(req),
    })
    next()
  }
}