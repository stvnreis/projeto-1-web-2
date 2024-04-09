import { Article } from '../../enterprise/entities/article'
import { RepositoryInterface, findAllOptions } from './repository-interface'

export abstract class ArticlesRepository
  implements RepositoryInterface<Article>
{
  abstract create(article: Article): Promise<void>
  abstract findById(articleId: string): Promise<Article>
  abstract findAll(options?: findAllOptions): Promise<Article[]>
  abstract findByAuthorId(authorId: string): Promise<Article[]>
  abstract updateOne(entity: Article): Promise<void>
  abstract updateMany(entities: Article[]): Promise<void>
}
