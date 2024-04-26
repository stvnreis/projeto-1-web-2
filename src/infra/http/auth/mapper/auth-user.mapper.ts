import { Role } from '@/domain/management/enterprise/entities/role'
import { User } from '@/domain/management/enterprise/entities/user'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

export class AuthUserMapper {
  static toPayload(
    user: User,
    role: Role,
    accessToken?: string,
  ): authUserSchema {
    return {
      user: {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
      },
      role: {
        id: role.id.toString(),
        name: role.name,
        type: role.type,
        canSubmitEditDeleteArticles: role.canSubmitEditDeleteArticles,
        canManageUsers: role.canManageUsers,
        canDeleteArticlesFromAnyUser: role.canDeleteArticlesFromAnyUser,
        canSubmitArticleToEvaluation: role.canSubmitArticleToEvaluation,
        canEvaluate: role.canEvaluate,
        canPubilshArticle: role.canPubilshArticle,
      },
      accessToken: accessToken ?? '',
    }
  }
}
