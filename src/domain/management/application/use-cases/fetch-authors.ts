import { Either, right } from '@/core/either'
import { Author } from '@/domain/management/enterprise/entities/author'
import { AuthorsRepository } from '@/domain/management/application/repositories/authors.repository'

export type fetchAuthorsResponse = Either<Error, { authors: Author[] }>

export class FetchAuthors {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async execute(): Promise<fetchAuthorsResponse> {
    const authors = await this.authorsRepository.findAll()

    return right({ authors })
  }
}
