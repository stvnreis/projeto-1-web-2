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

    console.log(payload)

    if (!payload.role.canEvaluate) return left(new Error('Non authorized!'))

    article.evaluate(
      Nota.create({
        n1Value: typeof n1 === 'string' ? parseInt(n1) : n1,
        n2Value: typeof n2 === 'string' ? parseInt(n2) : n2,
        evaluatorId: new UniqueEntityID(payload.user.id),
      }),
    )

    await this.articlesRepository.updateOne(article)

    return right({ article })
  }
}
