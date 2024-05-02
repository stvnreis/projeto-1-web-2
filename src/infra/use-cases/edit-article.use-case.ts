import { Injectable } from '@nestjs/common'
import { EditArticle } from '@/domain/management/application/use-cases/edit-article'
import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { AuthorsRepository } from '@/domain/management/application/repositories/authors.repository'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'

@Injectable()
export class EditArticleUseCase extends EditArticle {
  constructor(
    articlesRepository: ArticlesRepository,
    authorsRepository: AuthorsRepository,
    rolesRepository: RolesRepository,
  ) {
    super(articlesRepository, authorsRepository, rolesRepository)
  }
}
