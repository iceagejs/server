import { Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RolesService } from './roles.service'

@ApiTags('角色')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
  ) {}

  @Post()
  createRole() {
    return this.rolesService.createRole()
  }
}