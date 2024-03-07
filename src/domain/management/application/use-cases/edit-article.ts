import { Either, left, right } from '@/core/either'
import { Article } from '../../enterprise/entities/article'
import { ArticlesRepository } from '../repositories/articles.repository'
import { AuthorsRepository } from '../repositories/authors.repository'
import { File } from '../../enterprise/entities/value-objects/file'
import { RolesRepository } from '../repositories/roles.repository'

export interface editArticleRequest {
  articleId: string
  title: string
  sinopse: string
  file: {
    url: string
    type: 'PDF'
  }
  authorsId: string[]
  user: {
    id: string
    role: {
      id: string
      type: 'ADMIN' | 'AUTHOR' | 'USER'
    }
  }
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
    authorsId,
    user,
  }: editArticleRequest): Promise<editArticleResponse> {
    const article = await this.articlesRepository.findById(articleId)
    if (!article) return left(new Error('Article not found.'))

    const role = await this.rolesRepository.findById(user.role.id)
    if (!role) return left(new Error('Role not found.'))

    if (!role.canSubmitEditDeleteArticles)
      return left(new Error('Non authorized.'))

    const authors = await this.authorsRepository.findManyBy({ authorsId })
    if (!(authors.length === authorsId.length))
      return left(new Error('Author not found.'))

    article.title = title
    article.sinopse = sinopse
    article.changeFile(File.create({ ...file }))
    article.changeAuthorsId(authors.map((author) => author.id))

    await this.articlesRepository.updateOne(article)

    return right({ article })
  }
}
