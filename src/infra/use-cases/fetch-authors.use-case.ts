import { Injectable } from '@nestjs/common'
import { FetchAuthors } from '@/domain/management/application/use-cases/fetch-authors'
import { AuthorsRepository } from '@/domain/management/application/repositories/authors.repository'

@Injectable()
export class FetchAuthorsUseCase extends FetchAuthors {
  constructor(authorsRepository: AuthorsRepository) {
    super(authorsRepository)
  }
}
