import { Article } from '@/domain/management/enterprise/entities/article'
import { Author } from '@/domain/management/enterprise/entities/author'

export class ArticlePresenter {
  static toHttp(entity: Article, authors?: Author[]) {
    return {
      id: entity.id.toString(),
      sinopse: entity.sinopse,
      file: {
        url: entity.file.url,
        type: entity.file.type,
      },
      authors: authors
        ? authors.map((author) => {
            return {
              id: author.id.toString(),
              name: author.name,
            }
          })
        : null,
      grades: entity.grades.map((grade) => {
        return {
          evaluatorId: grade.evaluatorId.toString(),
          n1: grade.n1Value,
          n2: grade.n2Value,
          total: grade.totalValue,
        }
      }),
    }
  }
}
