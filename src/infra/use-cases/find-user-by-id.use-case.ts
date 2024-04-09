import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'
import { FindUserById } from '@/domain/management/application/use-cases/find-user-by-id'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindUserByIdUseCase extends FindUserById {
  constructor(
    usersRepository: UsersRepository,
    rolesRepository: RolesRepository,
  ) {
    super(usersRepository, rolesRepository)
  }
}
