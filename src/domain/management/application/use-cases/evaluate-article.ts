import { Either, left, right } from '@/core/either'
import { Article } from '../../enterprise/entities/article'
import { ArticlesRepository } from '../repositories/articles.repository'
import { RolesRepository } from '../repositories/roles.repository'
import { Nota } from '../../enterprise/entities/nota'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

export interface evaluateArticleRequest {
  articleId: string
  n1: number
  n2: number
  payload: authUserSchema
}
export type evaluateArticleResponse = Either<Error, { article: Article }>

export class EvaluateArticle {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute({
    articleId,
    n1,
    n2,
    payload,
  }: evaluateArticleRequest): Promise<evaluateArticleResponse> {
    const article = await this.articlesRepository.findById(articleId)
    if (!article) return left(new Error('Article not found!'))

    const role = await this.rolesRepository.findById(payload.role.id)
    if (!role) return left(new Error('Role not found!'))

    if (!role.canEvaluate) return left(new Error('Non authorized!'))

    article.evaluate(
      Nota.create({
        n1Value: n1,
        n2Value: n2,
        evaluatorId: new UniqueEntityID(payload.user.id),
      }),
    )

    await this.articlesRepository.updateOne(article)

    return right({ article })
  }
}
