import { Either, left, right } from '@/core/either'
import {
  AuthService,
  authUserSchema,
} from '@/domain/management/application/services/auth.service'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { AuthUserMapper } from '@/infra/http/auth/mapper/auth-user.mapper'

export interface authenticateUserRequest {
  email: string
  password: string
}

export type authenticateUserResponse = Either<
  Error,
  { userPayload: authUserSchema }
>

export class AuthenticateUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
    private readonly authService: AuthService,
  ) {}

  async execute({
    email,
    password,
  }: authenticateUserRequest): Promise<authenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) return left(new Error('User not found!'))

    if (user.password !== password)
      return left(new Error('Passwords do not match'))

    const role = await this.rolesRepository.findById(user.roleId.toString())

    return right({
      userPayload: AuthUserMapper.toPayload(
        user,
        role,
        await this.authService.sign(user, role),
      ),
    })
  }
}
