import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'
import { RolesRepository } from '../repositories/roles.repository'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

export interface createNewUserRequest {
  name: string
  email: string
  password: string
  roleId: string
  payload: authUserSchema
}

export type craeteNewUserResponse = Either<Error, { user: User }>

export class CreateNewUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    roleId,
    payload,
  }: createNewUserRequest): Promise<craeteNewUserResponse> {
    const currentUser = await this.usersRepository.findById(payload.user.id)
    if (!currentUser) return left(new Error('Current user does not exist.'))

    const currentUserRole = await this.rolesRepository.findById(
      currentUser.roleId.toString(),
    )
    if (!currentUserRole.canManageUsers) return left(new Error('Not allowed.'))

    const userExists = await this.usersRepository.findBy({ name })
    if (userExists) return left(new Error('User name already taken'))

    const role = await this.rolesRepository.findById(roleId)
    if (!role) return left(new Error('Role not found'))

    const user = User.create({ name, roleId: role.id, email, password })

    await this.usersRepository.create(user)

    return right({ user })
  }
}
