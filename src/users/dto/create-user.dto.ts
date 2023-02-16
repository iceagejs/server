import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  @IsString({ message: '用户名必须为字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString({ message: '用户名必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @ApiProperty({ description: '昵称', example: '管理员' })
  @IsString({ message: '昵称必须为字符串' })
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

