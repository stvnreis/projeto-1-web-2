import { Either, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'
import { RolesRepository } from '../repositories/roles.repository'
import { Role } from '../../enterprise/entities/role'

export type fetchUsersResponse = Either<
  Error,
  { data: { user: User; role: Role }[] }
>

export class FetchUsers {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute(): Promise<fetchUsersResponse> {
    const usersEntities = await this.usersRepository.findAll()

    const roles = await this.rolesRepository.findAll()

    const users = usersEntities.map((user) => {
      return {
        user,
        role: roles.find((role) => role.id.equals(user.roleId)),
      }
    })

    return right({ data: users })
  }
}
