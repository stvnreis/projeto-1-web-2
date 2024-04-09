import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/management/enterprise/entities/user'
import { Prisma, User as PrismaUser } from '@prisma/client'

export class UserMapper {
  static toPrisma(entity: User): Prisma.UserUncheckedCreateInput {
    return {
      id: entity.id.toString(),
      email: entity.email,
      name: entity.name,
      password: entity.password,
      roleId: entity.roleId.toString(),
    }
  }

  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        roleId: new UniqueEntityID(raw.roleId),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
