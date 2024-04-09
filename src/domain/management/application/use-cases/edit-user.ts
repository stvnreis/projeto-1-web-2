import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'
import { RolesRepository } from '../repositories/roles.repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface editUserRequest {
  id: string
  name: string
  roleId: string
  user: {
    id: string
    role: {
      id: string
      type: 'ADMIN' | 'AUTOR' | 'AVALIADOR'
    }
  }
}

export type editUserResponse = Either<Error, { user: User }>

export class EditUser {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute({
    id,
    name,
    roleId,
    user,
  }: editUserRequest): Promise<editUserResponse> {
    const role = await this.rolesRepository.findById(user.role.id)
    if (!role) return left(new Error('Role not found'))

    if (!role.canManageUsers) return left(new Error('Not allowed.'))

    const entity = await this.usersRepository.findById(id)

    entity.changeName(name)
    entity.changeRole(new UniqueEntityID(roleId))

    await this.usersRepository.updateOne(entity)

    return right({ user: entity })
  }
}
