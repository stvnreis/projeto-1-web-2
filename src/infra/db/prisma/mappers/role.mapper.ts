import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Role } from '@/domain/management/enterprise/entities/role'
import { Prisma, Role as PrismaRole } from '@prisma/client'

export class RoleMapper {
  static toDomain(raw: PrismaRole): Role {
    return Role.create({ ...raw }, new UniqueEntityID(raw.id))
  }

  static toPrisma(entity: Role): Prisma.RoleUncheckedCreateInput {
    return {
      name: entity.name,
      type: entity.type,
      canDeleteArticlesFromAnyUser: entity.canDeleteArticlesFromAnyUser,
      canEvaluate: entity.canEvaluate,
      canManageUsers: entity.canManageUsers,
      canPubilshArticle: entity.canPubilshArticle,
      canSubmitArticleToEvaluation: entity.canSubmitArticleToEvaluation,
      canSubmitEditDeleteArticles: entity.canSubmitEditDeleteArticles,
      id: entity.id.toString(),
    }
  }
}
