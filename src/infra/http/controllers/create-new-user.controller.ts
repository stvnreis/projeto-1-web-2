import {
  CreateNewUser,
  createNewUserRequest,
} from '@/domain/management/application/use-cases/create-new-user'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'
import { Request } from 'express'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

@Controller('users')
export class CreateNewUserController {
  constructor(private readonly sut: CreateNewUser) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async handle(@Body() data: createNewUserRequest, @Req() req: Request) {
    const payload = req.user as authUserSchema

    const result = await this.sut.execute({ ...data, payload })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: result.value.user }
  }
}
