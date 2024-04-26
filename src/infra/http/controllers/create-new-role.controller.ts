import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import {
  CreateNewRole,
  createNewRoleRequest,
} from '@/domain/management/application/use-cases/create-new-role'

@Controller('roles')
export class CreateNewRoleController {
  constructor(private readonly sut: CreateNewRole) {}

  @Post()
  async handle(@Body() data: createNewRoleRequest) {
    const result = await this.sut.execute({ ...data })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: result.value.role, message: 'Role created successfully.' }
  }
}
