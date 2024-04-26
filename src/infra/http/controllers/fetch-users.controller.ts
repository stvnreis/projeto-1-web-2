import { FetchUsers } from '@/domain/management/application/use-cases/fetch-users'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserPresenter } from '../presenters/user.presenter'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'

@Controller('users')
export class FetchUsersController {
  constructor(private readonly sut: FetchUsers) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle() {
    const result = await this.sut.execute()

    if (result.isRight())
      return {
        data: result.value.data.map((item) =>
          UserPresenter.toHttp(item.user, item.role),
        ),
      }
  }
}
