import { File } from '@/domain/management/enterprise/entities/value-objects/file'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Article } from '@/domain/management/enterprise/entities/article'
import {
  Prisma,
  Article as PrismaArticle,
  Author as PrismaAuthor,
  ArticleGradeByEvaluator as PrismaGrade,
} from '@prisma/client'
import { Nota } from '@/domain/management/enterprise/entities/nota'

export class ArticleMapper {
  static toDomain(
    raw: PrismaArticle,
    rawAuthor: PrismaAuthor[],
    rawGrades: PrismaGrade[],
  ): Article {
    return Article.create(
      {
        authorsId: rawAuthor.map((author) => new UniqueEntityID(author.id)),
        file: File.create({ url: raw.fileUrl, type: raw.fileType }),
        sinopse: raw.sinopse,
        title: raw.title,
        isPublished: raw.isPublished,
        grades: rawGrades.map((rawGrade) =>
          Nota.create({
            evaluatorId: new UniqueEntityID(rawGrade.evaluatorId),
            n1Value: rawGrade.n1Value,
            n2Value: rawGrade.n2Value,
            totalValue: rawGrade.totalValue,
          }),
        ),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(entity: Article): Prisma.ArticleUncheckedCreateInput {
    return {
      fileType: entity.file.type,
      fileUrl: entity.file.url,
      sinopse: entity.sinopse,
      title: entity.title,
      id: entity.id.toString(),
      isPublished: entity.isPublished,
      AuthorArticle: this.createAuthorArticle(entity.authorsId),
    }
  }

  static createAuthorArticle(
    authorsId: UniqueEntityID[],
  ): Prisma.AuthorArticleUncheckedCreateNestedManyWithoutArticleInput {
    return {
      createMany: {
        data: authorsId.map((authorId) => {
          return {
            authorId: authorId.toString(),
          }
        }),
      },
    }
  }

  static toPrismaUpdate(entity: Article): Prisma.ArticleUncheckedUpdateInput {
    return {
      fileType: entity.file.type,
      fileUrl: entity.file.url,
      sinopse: entity.sinopse,
      title: entity.title,
      isPublished: entity.isPublished,
      ArticleGradeByEvaluator: {
        deleteMany: {
          articleId: entity.id.toString(),
        },
        createMany: {
          data: entity.grades.map((grade) => {
            return {
              evaluatorId: grade.evaluatorId.toString(),
              n1Value: grade.n1Value,
              n2Value: grade.n2Value,
              totalValue: grade.totalValue,
            }
          }),
        },
      },
    }
  }
}
