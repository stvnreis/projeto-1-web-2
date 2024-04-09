import { Either, left, right } from '@/core/either'
import { Article } from '@/domain/management/enterprise/entities/article'
import { ArticlesRepository } from '../repositories/articles.repository'

export interface findArticleByIdRequest {
  articleId: string
}

export type findArticleByIdResponse = Either<Error, { article: Article }>

export class FindArticleById {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async execute({
    articleId,
  }: findArticleByIdRequest): Promise<findArticleByIdResponse> {
    const article = await this.articlesRepository.findById(articleId)
    if (!article) return left(new Error('Article not found'))

    return right({ article })
  }
}
