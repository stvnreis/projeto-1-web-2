import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Role, RoleProps } from '@/domain/management/enterprise/entities/role'
import { faker } from '@faker-js/faker'

export const makeRole = (
  override: Partial<RoleProps> = {},
  id?: UniqueEntityID,
) => {
  return Role.create(
    {
      canDeleteArticlesFromAnyUser:
        override.canDeleteArticlesFromAnyUser ?? true,
      canEvaluate: override.canEvaluate ?? true,
      canManageUsers: override.canManageUsers ?? true,
      canPubilshArticle: override.canPubilshArticle ?? true,
      canSubmitArticleToEvaluation:
        override.canSubmitArticleToEvaluation ?? true,
      canSubmitEditDeleteArticles: override.canSubmitEditDeleteArticles ?? true,
      name: override.name ?? faker.company.name(),
      type: override.type ?? 'ADMIN',
    },
    id,
  )
}
