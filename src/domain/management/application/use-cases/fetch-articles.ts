import { Either, right } from '@/core/either'
import { Article } from '../../enterprise/entities/article'
import { ArticlesRepository } from '../repositories/articles.repository'
import { AuthorsRepository } from '../repositories/authors.repository'
import { Author } from '../../enterprise/entities/author'

export type fetchArticlesResponse = Either<
  Error,
  { items: { article: Article; authors: Author[] }[] }
>

export class FetchArticles {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly authorsRepository: AuthorsRepository,
  ) {}

  async execute() {
    const articles = await this.articlesRepository.findAll()

    const authors = await this.authorsRepository.findAll()

    const items = articles.map((article) => {
      return {
        article,
        authors: authors.filter((item) =>
          article.authorsId.find((id) => id.equals(item.id)),
        ),
      }
    })

    return right({ items })
  }
}
