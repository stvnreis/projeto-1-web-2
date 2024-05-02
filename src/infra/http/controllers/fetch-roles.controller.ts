import { BadRequestException, Controller, Get } from '@nestjs/common'
import { FetchRoles } from '@/domain/management/application/use-cases/fetch-roles'
import { RolePresenter } from '@/infra/http/presenters/role.presenter'

@Controller('roles')
export class FetchRolesController {
  constructor(private readonly sut: FetchRoles) {}

  @Get()
  async handle() {
    const result = await this.sut.execute()

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: result.value.roles.map(RolePresenter.toHttp) }
  }
}
