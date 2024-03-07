import { Article } from '../../enterprise/entities/article'
import { RepositoryInterface } from './repository-interface'

export abstract class ArticlesRepository
  implements RepositoryInterface<Article>
{
  abstract create(article: Article): Promise<void>
  abstract findById(articleId: string): Promise<Article>
  abstract findAll(): Promise<Article[]>
  abstract findByAuthorId(authorId: string): Promise<Article[]>
  abstract updateOne(entity: Article): Promise<void>
}
