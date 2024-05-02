import { Injectable } from '@nestjs/common'
import { FetchRoles } from '@/domain/management/application/use-cases/fetch-roles'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'

@Injectable()
export class FetchRolesUseCase extends FetchRoles {
  constructor(rolesRepository: RolesRepository) {
    super(rolesRepository)
  }
}
