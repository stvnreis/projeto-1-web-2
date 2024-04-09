import {
  EditUser,
  editUserRequest,
} from '@/domain/management/application/use-cases/edit-user'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
} from '@nestjs/common'

@Controller('users')
export class EditUserController {
  constructor(private readonly sut: EditUser) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() data: editUserRequest) {
    const result = await this.sut.execute({ ...data, id })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: result.value.user }
  }
}
