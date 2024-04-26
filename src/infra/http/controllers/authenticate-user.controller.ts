import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import {
  AuthenticateUser,
  authenticateUserRequest,
} from '@/domain/management/application/use-cases/authenticate-user'
import { AuthService } from '@/domain/management/application/services/auth.service'

@Controller('auth')
export class AuthenticateUserController {
  constructor(
    private readonly sut: AuthenticateUser,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async handle(@Body() data: authenticateUserRequest) {
    const result = await this.sut.execute({ ...data })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    const { user, role, accessToken } = result.value.userPayload

    return {
      data: {
        user,
        role,
        accessToken,
      },
      message: 'User authenticated successfully',
    }
  }
}
