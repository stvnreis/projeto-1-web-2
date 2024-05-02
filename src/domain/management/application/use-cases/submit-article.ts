import { Either, left, right } from '@/core/either'
import { Article } from '../../enterprise/entities/article'
import { ArticlesRepository } from '../repositories/articles.repository'
import { File } from '../../enterprise/entities/value-objects/file'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AuthorsRepository } from '../repositories/authors.repository'
import { RolesRepository } from '../repositories/roles.repository'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

export interface submitArticleRequest {
  title: string
  sinopse: string
  file: {
    url: string
    type: 'PDF'
  }
  authors: {
    id: string
  }[]
  payload: authUserSchema
}

export type submitArticleResponse = Either<Error, { article: Article }>

export class SubmitArticle {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly authorsRepository: AuthorsRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute({
    title,
    sinopse,
    file,
    authors,
    payload,
  }: submitArticleRequest): Promise<submitArticleResponse> {
    const authorsEntity = await this.authorsRepository.findManyBy({
      authorsId: authors.map((author) => author.id),
    })
    if (authors.length > 5)
      return left(new Error('There can only be 5 authors'))

    console.log(authors.map((author) => author.id))

    const role = await this.rolesRepository.findById(payload.role.id)
    if (!role) return left(new Error('Role not found'))

    if (!role.canPubilshArticle) return left(new Error('Not authorized'))

    const article = Article.create(
      {
        title,
        sinopse,
        file: File.create({ type: file.type, url: file.url }),
        authorsId: authorsEntity.map((author) => author.id),
      },
      new UniqueEntityID(),
    )

    await this.articlesRepository.create(article)

    return right({ article })
  }
}
