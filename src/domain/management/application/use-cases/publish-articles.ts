import { Either, left, right } from '@/core/either'
import { Article } from '../../enterprise/entities/article'
import { ArticlesRepository } from '../repositories/articles.repository'
import { RolesRepository } from '../repositories/roles.repository'

export interface publishArticlesRequest {
  articlesId: string[]
  user: {
    id: string
    role: {
      id: string
      type: 'ADMIN' | 'AUTOR' | 'AVALIADOR'
    }
  }
}

export type publishArticlesResponse = Either<Error, { articles: Article[] }>

export class PublishArticles {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute({
    articlesId,
    user,
  }: publishArticlesRequest): Promise<publishArticlesResponse> {
    const role = await this.rolesRepository.findById(user.role.id)
    if (!role) return left(new Error('Role not found'))

    if (!role.canSubmitArticleToEvaluation)
      return left(new Error('Non authorized'))

    const articles = await this.articlesRepository.findAll({ ids: articlesId })
    if (!articles.length) return left(new Error('No article found!'))

    articles.forEach(async (article) => {
      article.publish()

      await this.articlesRepository.updateOne(article)
    })

    return right({ articles })
  }
}
