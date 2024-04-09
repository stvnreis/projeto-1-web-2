import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { EvaluateArticle } from '@/domain/management/application/use-cases/evaluate-article'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EvaluateArticleUseCase extends EvaluateArticle {
  constructor(
    articlesRepository: ArticlesRepository,
    rolesRepository: RolesRepository,
  ) {
    super(articlesRepository, rolesRepository)
  }
}
