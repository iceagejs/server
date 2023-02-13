import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export interface AppConfig {
  GLOBAL_PREFIX: string
  APP_RUN_PORT: number

  MYSQL_CONFIG: {
    name: string
    type: any
    host: string
    port: number
    username: string
    password: string
    database: string
    entities: string[]
    synchronize: boolean
  }
}