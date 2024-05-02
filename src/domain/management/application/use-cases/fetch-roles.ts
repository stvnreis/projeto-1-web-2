import { Either, right } from '@/core/either'
import { Role } from '@/domain/management/enterprise/entities/role'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'

export type fetchRolesResponse = Either<Error, { roles: Role[] }>

export class FetchRoles {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async execute(): Promise<fetchRolesResponse> {
    const roles = await this.rolesRepository.findAll()

    return right({ roles })
  }
}
