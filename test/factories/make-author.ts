import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Author,
  AuthorProps,
} from '@/domain/management/enterprise/entities/author'
import { faker } from '@faker-js/faker'

export const makeAuthor = (
  override: Partial<AuthorProps> = {},
  id?: UniqueEntityID,
) => {
  return Author.create({ name: override.name ?? faker.person.fullName() }, id)
}
