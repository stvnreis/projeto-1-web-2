import { Role } from '@/domain/management/enterprise/entities/role'
import { User } from '@/domain/management/enterprise/entities/user'

export class UserPresenter {
  static toHttp(entity: User, role?: Role) {
    return {
      id: entity.id.toString(),
      name: entity.name,
      email: entity.email,
      role: {
        id: entity.roleId.toString(),
        type: role.type,
        name: role.name,
        canSubmitEditDeleteArticles: role.canSubmitEditDeleteArticles,
        canManageUsers: role.canManageUsers,
        canDeleteArticlesFromAnyUser: role.canDeleteArticlesFromAnyUser,
        canSubmitArticleToEvaluation: role.canSubmitArticleToEvaluation,
        canEvaluate: role.canEvaluate,
        canPubilshArticle: role.canPubilshArticle,
      },
    }
  }
}
