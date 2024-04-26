import { Injectable } from '@nestjs/common'
import { AuthenticateUser } from '@/domain/management/application/use-cases/authenticate-user'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'
import { AuthService } from '@/domain/management/application/services/auth.service'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'

@Injectable()
export class AuthenticateUserUseCase extends AuthenticateUser {
  constructor(
    usersRepository: UsersRepository,
    rolesRepository: RolesRepository,
    abstractAuthService: AuthService,
  ) {
    super(usersRepository, rolesRepository, abstractAuthService)
  }
}
