import { FindUserById } from '@/domain/management/application/use-cases/find-user-by-id'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { UserPresenter } from '../presenters/user.presenter'

@Controller('users/:id')
export class FindUserByIdController {
  constructor(private readonly sut: FindUserById) {}

  @Get()
  async handle(@Param('id') userId: string) {
    const result = await this.sut.execute({ userId })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    const { user, role } = result.value

    return { data: UserPresenter.toHttp(user, role) }
  }
}
