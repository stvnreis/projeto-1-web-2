import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { Article } from '@/domain/management/enterprise/entities/article'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { ArticleMapper } from '../mappers/article.mapper'
import { findAllOptions } from '@/domain/management/application/repositories/repository-interface'

@Injectable()
export class PrismaArticlesRepostory implements ArticlesRepository {
  private readonly EMPTY_STRING: string = ''

  constructor(private readonly db: PrismaService) {}

  async create(article: Article): Promise<void> {
    const data = ArticleMapper.toPrisma(article)

    await this.db.article.create({ data })
  }

  async findById(articleId: string): Promise<Article> {
    const article = await this.db.article.findFirst({
      where: { id: articleId },
      include: {
        AuthorArticle: { include: { author: true } },
        ArticleGradeByEvaluator: true,
      },
    })
    if (!article) return null

    return ArticleMapper.toDomain(
      article,
      article.AuthorArticle.map((authorArticle) => authorArticle.author),
      article.ArticleGradeByEvaluator,
    )
  }

  async findAll(options: findAllOptions): Promise<Article[]> {
    const articles = await this.db.article.findMany({
      include: {
        AuthorArticle: { include: { author: true } },
        ArticleGradeByEvaluator: true,
      },
      where: {
        id:
          options && options.ids
            ? { in: options.ids }
            : { not: this.EMPTY_STRING },
      },
    })

    return articles.map((article) =>
      ArticleMapper.toDomain(
        article,
        article.AuthorArticle.map((authorArticle) => authorArticle.author),
        article.ArticleGradeByEvaluator,
      ),
    )
  }

  async findByAuthorId(authorId: string): Promise<Article[]> {
    const articles = await this.db.article.findMany({
      include: {
        AuthorArticle: { include: { author: true } },
        ArticleGradeByEvaluator: true,
      },
      where: { AuthorArticle: { some: { authorId } } },
    })

    return articles.map((article) =>
      ArticleMapper.toDomain(
        article,
        article.AuthorArticle.map((authorArticle) => authorArticle.author),
        article.ArticleGradeByEvaluator,
      ),
    )
  }

  async updateMany(entities: Article[]): Promise<void> {
    const data = entities.map(ArticleMapper.toPrisma)

    await this.db.article.updateMany({ data })
  }

  async updateOne(entity: Article): Promise<void> {
    const data = ArticleMapper.toPrismaUpdate(entity)

    await this.db.article.update({
      data,
      where: { id: entity.id.toString() },
    })
  }
}
