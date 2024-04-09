import {
  AuthorsRepository,
  findManyByOptions,
} from '@/domain/management/application/repositories/authors.repository'
import { Author } from '@/domain/management/enterprise/entities/author'

export class InMemoryAuthorsRepository implements AuthorsRepository {
  items: Author[] = []
  updateMany(entities: Author[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  updateOne(entity: Author): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(authorId: string): Promise<Author> {
    const author = this.items.find((item) => item.id.toString() === authorId)
    if (!author) return null

    return author
  }

  async findAll(): Promise<Author[]> {
    return this.items
  }

  async findManyBy(options: findManyByOptions): Promise<Author[]> {
    const authors = this.items.filter((item) =>
      options.authorsId.includes(item.id.toString()),
    )

    return authors
  }

  async create(author: Author): Promise<void> {
    this.items.push(author)
  }
}
