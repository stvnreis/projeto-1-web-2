import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { FindArticleById } from '@/domain/management/application/use-cases/find-article-by-id'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindArticleByIdUseCase extends FindArticleById {
  constructor(articlesRepository: ArticlesRepository) {
    super(articlesRepository)
  }
}
