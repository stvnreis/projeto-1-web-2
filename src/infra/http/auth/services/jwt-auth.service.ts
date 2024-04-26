import { Injectable } from '@nestjs/common'
import {
  AuthService,
  authUserSchema,
} from '@/domain/management/application/services/auth.service'
import { User } from '@/domain/management/enterprise/entities/user'
import { Role } from '@/domain/management/enterprise/entities/role'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthService implements AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate(user: User, role: Role): Promise<authUserSchema> {
    return {} as authUserSchema
  }

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(false)
  }

  async sign(user: User, role: Role): Promise<string> {
    return this.jwtService.sign(this.mapToJwt(user, role))
  }

  private mapToJwt(user: User, role: Role): object {
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
    }
  }
}
