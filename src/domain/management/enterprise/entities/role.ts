import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RoleProps {
  name: string
  type: 'ADMIN' | 'AUTOR' | 'AVALIADOR'
  canSubmitEditDeleteArticles: boolean
  canManageUsers: boolean
  canDeleteArticlesFromAnyUser: boolean
  canSubmitArticleToEvaluation: boolean
  canEvaluate: boolean
  canPubilshArticle: boolean
}

export class Role extends Entity<RoleProps> {
  get name(): string {
    return this.props.name
  }

  get canSubmitEditDeleteArticles(): boolean {
    return this.props.canSubmitEditDeleteArticles
  }

  get canManageUsers(): boolean {
    return this.props.canManageUsers
  }

  get canDeleteArticlesFromAnyUser(): boolean {
    return this.props.canDeleteArticlesFromAnyUser
  }

  get canSubmitArticleToEvaluation(): boolean {
    return this.props.canSubmitArticleToEvaluation
  }

  get canEvaluate(): boolean {
    return this.props.canEvaluate
  }

  get canPubilshArticle(): boolean {
    return this.props.canPubilshArticle
  }

  get type(): 'ADMIN' | 'AUTOR' | 'AVALIADOR' {
    return this.props.type
  }

  static create(props: RoleProps, id?: UniqueEntityID): Role {
    return new Role(props, id)
  }
}
