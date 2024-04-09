import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Author } from '@/domain/management/enterprise/entities/author'
import { Author as PrismaAuthor, Prisma } from '@prisma/client'

export class AuthorsMapper {
  static toDomain(raw: PrismaAuthor): Author {
    return Author.create(
      {
        name: raw.name,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(entity: Author): Prisma.AuthorUncheckedCreateInput {
    return {
      name: entity.name,
      id: entity.id.toString(),
    }
  }
}
