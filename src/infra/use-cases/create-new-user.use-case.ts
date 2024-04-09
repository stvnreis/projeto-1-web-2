import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'
import { CreateNewUser } from '@/domain/management/application/use-cases/create-new-user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateNewUserUseCase extends CreateNewUser {
  constructor(
    usersRepository: UsersRepository,
    rolesRepository: RolesRepository,
  ) {
    super(usersRepository, rolesRepository)
  }
}
