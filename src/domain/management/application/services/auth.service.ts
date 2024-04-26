import { User } from '@/domain/management/enterprise/entities/user'
import { Role } from '@/domain/management/enterprise/entities/role'

export interface authUserSchema {
  user: {
    id: string
    name: string
    email: string
  }
  role: {
    id: string
    name: string
    type: string
    canSubmitEditDeleteArticles: boolean
    canManageUsers: boolean
    canDeleteArticlesFromAnyUser: boolean
    canSubmitArticleToEvaluation: boolean
    canEvaluate: boolean
    canPubilshArticle: boolean
  }
  accessToken: string
}

export abstract class AuthService {
  abstract isAuthenticated(): Promise<boolean>
  abstract authenticate(user: User, role: Role): Promise<authUserSchema>
  abstract sign(user: User, role: Role): Promise<string>
}
