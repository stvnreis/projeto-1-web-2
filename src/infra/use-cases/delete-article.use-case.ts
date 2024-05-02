import { Injectable } from '@nestjs/common'
import { DeleteArticle } from '@/domain/management/application/use-cases/delete-article'
import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'

@Injectable()
export class DeleteArticleUseCase extends DeleteArticle {
  constructor(articlesRepository: ArticlesRepository) {
    super(articlesRepository)
  }
}
