import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/management/enterprise/entities/user'
import { faker } from '@faker-js/faker'

export const makeUser = (
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
): User => {
  return User.create(
    {
      name: override.name ?? faker.person.fullName(),
      roleId: override.roleId ?? new UniqueEntityID(),
      email: override.email ?? faker.internet.email(),
      password: override.password ?? faker.internet.password(),
    },
    id,
  )
}
