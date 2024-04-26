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
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'
import { Request } from 'express'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

@Controller('users')
export class EditUserController {
  constructor(private readonly sut: EditUser) {}

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async handle(
    @Param('id') id: string,
    @Body() data: editUserRequest,
    @Req() req: Request,
  ) {
    const payload = req.user as authUserSchema

    const result = await this.sut.execute({ ...data, id, payload })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: result.value.user }
  }
}
