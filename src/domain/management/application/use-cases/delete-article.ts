import { authUserSchema } from '@/domain/management/application/services/auth.service'
import { Either, left, right } from '@/core/either'
import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'

export interface deleteArticleRequest {
  articleId: string
  payload: authUserSchema
}

export type deleteArticleResponse = Either<Error, void>

export class DeleteArticle {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute({
    articleId,
    payload,
  }: deleteArticleRequest): Promise<deleteArticleResponse> {
    const article = await this.articlesRepository.findById(articleId)
    if (!article) return left(new Error('Artigo não encontrado'))

    if (
      !payload.role.canDeleteArticlesFromAnyUser ||
      !payload.role.canSubmitEditDeleteArticles
    )
      return left(new Error('Não permitido'))

    await this.articlesRepository.delete(article.id.toString())

    return right(null)
  }
}
