import { Injectable } from '@nestjs/common'
import { CreateNewRole } from '@/domain/management/application/use-cases/create-new-role'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'

@Injectable()
export class CreateNewRoleUseCase extends CreateNewRole {
  constructor(rolesRepository: RolesRepository) {
    super(rolesRepository)
  }
}
