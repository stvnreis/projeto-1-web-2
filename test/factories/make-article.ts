import { File } from '@/domain/management/enterprise/entities/value-objects/file'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Article,
  ArticleProps,
} from '@/domain/management/enterprise/entities/article'
import { faker } from '@faker-js/faker'

export const makeArticle = (
  override: Partial<ArticleProps> = {},
  id?: UniqueEntityID,
) => {
  return Article.create(
    {
      title: override.title ?? faker.commerce.productName(),
      sinopse: override.sinopse ?? faker.commerce.productDescription(),
      authorsId: override.authorsId ?? [new UniqueEntityID()],
      file:
        override.file ??
        File.create({
          type: 'PDF',
          url: faker.internet.url(),
        }),
    },
    id,
  )
}
