import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { AuthorsRepository } from '@/domain/management/application/repositories/authors.repository'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { SubmitArticle } from '@/domain/management/application/use-cases/submit-article'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SubmitArticleUseCase extends SubmitArticle {
  constructor(
    articlesRepository: ArticlesRepository,
    authorsRepository: AuthorsRepository,
    rolesRepository: RolesRepository,
  ) {
    super(articlesRepository, authorsRepository, rolesRepository)
  }
}
