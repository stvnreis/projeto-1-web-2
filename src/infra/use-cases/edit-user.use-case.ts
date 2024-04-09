import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'
import { EditUser } from '@/domain/management/application/use-cases/edit-user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EditUserUseCase extends EditUser {
  constructor(
    usersRepository: UsersRepository,
    rolesRepository: RolesRepository,
  ) {
    super(usersRepository, rolesRepository)
  }
}
