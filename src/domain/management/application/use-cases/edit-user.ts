import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users.repository'
import { RolesRepository } from '../repositories/roles.repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

export interface editUserRequest {
  id: string
  name: string
  roleId: string
  payload: authUserSchema
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
    payload,
  }: editUserRequest): Promise<editUserResponse> {
    const currentUserRole = await this.rolesRepository.findById(payload.role.id)
    if (!currentUserRole) return left(new Error('Role not found'))

    if (!currentUserRole.canManageUsers) return left(new Error('Not allowed.'))

    const entity = await this.usersRepository.findById(id)
    const role = await this.rolesRepository.findById(roleId)

    entity.changeName(name)
    entity.changeRole(role.id)

    await this.usersRepository.updateOne(entity)

    return right({ user: entity })
  }
}
