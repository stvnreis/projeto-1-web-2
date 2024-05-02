import { Either, left, right } from '@/core/either'
import { Article } from '../../enterprise/entities/article'
import { ArticlesRepository } from '../repositories/articles.repository'
import { RolesRepository } from '../repositories/roles.repository'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

export interface publishArticlesRequest {
  articleId: string
  payload: authUserSchema
}

export type publishArticlesResponse = Either<Error, { article: Article }>

export class PublishArticles {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute({
    articleId,
    payload,
  }: publishArticlesRequest): Promise<publishArticlesResponse> {
    const role = await this.rolesRepository.findById(payload.role.id)
    if (!role) return left(new Error('Role not found'))

    if (!role.canSubmitArticleToEvaluation)
      return left(new Error('Not allowed'))

    const article = await this.articlesRepository.findById(articleId)
    if (!article) return left(new Error('Artigo não encontrado.'))

    article.publish()

    await this.articlesRepository.updateOne(article)

    return right({ article })
  }
}
