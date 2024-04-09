import {
  CreateNewUser,
  createNewUserRequest,
} from '@/domain/management/application/use-cases/create-new-user'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'

@Controller('users')
export class CreateNewUserController {
  constructor(private readonly sut: CreateNewUser) {}

  @Post()
  async handle(@Body() data: createNewUserRequest) {
    const result = await this.sut.execute({ ...data })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: result.value.user }
  }
}
