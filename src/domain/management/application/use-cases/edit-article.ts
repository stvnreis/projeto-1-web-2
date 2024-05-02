import { Either, left, right } from '@/core/either'
import { Article } from '../../enterprise/entities/article'
import { ArticlesRepository } from '../repositories/articles.repository'
import { AuthorsRepository } from '../repositories/authors.repository'
import { File } from '../../enterprise/entities/value-objects/file'
import { RolesRepository } from '../repositories/roles.repository'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

export interface editArticleRequest {
  articleId: string
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

export type editArticleResponse = Either<Error, { article: Article }>

export class EditArticle {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly authorsRepository: AuthorsRepository,
    private readonly rolesRepository: RolesRepository,
  ) {}

  async execute({
    articleId,
    title,
    sinopse,
    file,
    authors,
    payload,
  }: editArticleRequest): Promise<editArticleResponse> {
    const article = await this.articlesRepository.findById(articleId)
    if (!article) return left(new Error('Article not found.'))

    const role = await this.rolesRepository.findById(payload.role.id)
    if (!role) return left(new Error('Role not found.'))

    if (!role.canSubmitEditDeleteArticles)
      return left(new Error('Not allowed.'))

    const authorsEntity = await this.authorsRepository.findManyBy({
      authorsId: authors.map((author) => author.id),
    })
    if (!(authorsEntity.length === authors.length))
      return left(new Error('Author not found.'))

    article.title = title
    article.sinopse = sinopse
    article.changeFile(File.create({ ...file }))
    article.changeAuthorsId(authorsEntity.map((author) => author.id))

    await this.articlesRepository.updateOne(article)

    return right({ article })
  }
}
