import { Author } from '../../enterprise/entities/author'

export interface findManyByOptions {
  authorsId: string[]
}

export abstract class AuthorsRepository {
  abstract findById(authorId: string): Promise<Author>
  abstract findAll(): Promise<Author[]>
  abstract findManyBy(options: findManyByOptions): Promise<Author[]>
  abstract create(author: Author): Promise<void>
}
