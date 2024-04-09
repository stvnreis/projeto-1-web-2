import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'
import { FetchUsers } from '@/domain/management/application/use-cases/fetch-users'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FetchUsersUseCase extends FetchUsers {
  constructor(
    usersRepository: UsersRepository,
    rolesRepository: RolesRepository,
  ) {
    super(usersRepository, rolesRepository)
  }
}
