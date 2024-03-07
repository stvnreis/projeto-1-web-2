import { Either, left, right } from '@/core/either'
import { Role } from '../../enterprise/entities/role'
import { RolesRepository } from '../repositories/roles.repository'

export interface createNewRoleRequest {
  name: string
  canSubmitEditDeleteArticles: boolean
  canManageUsers: boolean
  canDeleteArticlesFromAnyUser: boolean
  canSubmitArticleToEvaluation: boolean
  canEvaluate: boolean
  canPubilshArticle: boolean
}

export type createNewRoleResponse = Either<Error, { role: Role }>

export class CreateNewRole {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async execute(request: createNewRoleRequest): Promise<createNewRoleResponse> {
    const roleExists = await this.rolesRepository.findByname(request.name)
    if (roleExists) return left(new Error('Role already exists'))

    const role = Role.create(request)

    await this.rolesRepository.create(role)

    return right({ role })
  }
}
