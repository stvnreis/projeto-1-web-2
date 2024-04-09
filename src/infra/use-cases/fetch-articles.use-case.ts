import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { AuthorsRepository } from '@/domain/management/application/repositories/authors.repository'
import { FetchArticles } from '@/domain/management/application/use-cases/fetch-articles'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FetchArticlesUseCase extends FetchArticles {
  constructor(
    articlesRepository: ArticlesRepository,
    authorsRepository: AuthorsRepository,
  ) {
    super(articlesRepository, authorsRepository)
  }
}
