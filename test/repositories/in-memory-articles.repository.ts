import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { Article } from '@/domain/management/enterprise/entities/article'

export class InMemoryArticlesRepository implements ArticlesRepository {
  items: Article[] = []

  async create(article: Article): Promise<void> {
    this.items.push(article)
  }

  async findById(articleId: string): Promise<Article> {
    const article = this.items.find((item) => item.id.toString() === articleId)
    if (!article) return null

    return article
  }

  async findAll(): Promise<Article[]> {
    return this.items
  }

  async findByAuthorId(authorId: string): Promise<Article[]> {
    const articles = this.items.filter((item) =>
      item.authorsId.includes(new UniqueEntityID(authorId)),
    )

    return articles
  }

  async updateOne(entity: Article): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.equals(entity.id))

    this.items[itemIndex] = entity
  }
}
