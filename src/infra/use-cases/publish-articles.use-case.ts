import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { PublishArticles } from '@/domain/management/application/use-cases/publish-articles'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PublishArticlesUseCase extends PublishArticles {
  constructor(
    articlesRepository: ArticlesRepository,
    rolesRepository: RolesRepository,
  ) {
    super(articlesRepository, rolesRepository)
  }
}
