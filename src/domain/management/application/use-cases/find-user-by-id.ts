import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { Role } from '../../enterprise/entities/role'
import { UsersRepository } from '../repositories/users.repository'
import { RolesRepository } from '../repositories/roles.repository'

export interface findUserByIdRequest {
  userId: string
}

export type findUserByIdResponse = Either<Error, { user: User; role: Role }>

export class FindUserById {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute({
    userId,
  }: findUserByIdRequest): Promise<findUserByIdResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) return left(new Error('User not found!'))

    const role = await this.rolesRepository.findById(user.roleId.toString())
    if (!role) return left(new Error('User is not related to a valid role.'))

    return right({ user, role })
  }
}
