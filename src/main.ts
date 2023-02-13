import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { generateDocument } from './doc'
import { getConfig } from './utils'

const config = getConfig()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  // 开启版本控制
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL],
    type: VersioningType.URI
  })

  // 生成文档
  generateDocument(app)

  await app.listen(config.APP_RUN_PORT)
}
bootstrap()
