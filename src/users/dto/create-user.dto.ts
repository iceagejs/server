import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string

  @ApiProperty({ description: '密码', example: '123456' })
  password: string

  @ApiProperty({ description: '昵称', example: '管理员' })
  nickname: string

  @ApiProperty({ description: '头像', example: 'http://www.baidu.com' })
  avatar: string

  @ApiProperty({ description: '邮箱', example: 'xxxx@gmail.com' })
  email: string
  
  @ApiProperty({ description: '手机号', example: '12345678901' })
  phone: string

  @ApiProperty({ description: '性别', example: 1 })
  gender: number

  @ApiProperty({ description: '生日', example: '2020-01-01' })
  birthday: string

}
