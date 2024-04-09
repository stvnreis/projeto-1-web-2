import { Author } from '../../enterprise/entities/author'
import { RepositoryInterface } from './repository-interface'

export interface findManyByOptions {
  authorsId: string[]
}

export abstract class AuthorsRepository implements RepositoryInterface<Author> {
  abstract findById(authorId: string): Promise<Author>
  abstract findAll(): Promise<Author[]>
  abstract findManyBy(options: findManyByOptions): Promise<Author[]>
  abstract create(author: Author): Promise<void>
  abstract updateMany(entities: Author[]): Promise<void>
  abstract updateOne(entity: Author): Promise<void>
}
