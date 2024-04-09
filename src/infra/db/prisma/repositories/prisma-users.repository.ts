import {
  UsersRepository,
  findByOptions,
} from '@/domain/management/application/repositories/users.repository'
import { User } from '@/domain/management/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { UserMapper } from '../mappers/user.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly db: PrismaService) {}

  async updateMany(entities: User[]): Promise<void> {
    const data = entities.map(UserMapper.toPrisma)

    await this.db.user.updateMany({ data })
  }

  async create(user: User): Promise<void> {
    const data = UserMapper.toPrisma(user)

    await this.db.user.create({ data })
  }

  async findById(userId: string): Promise<User> {
    const user = await this.db.user.findFirst({ where: { id: userId } })
    if (!user) return null

    return UserMapper.toDomain(user)
  }

  async findAll(): Promise<User[]> {
    const users = await this.db.user.findMany()

    return users.map(UserMapper.toDomain)
  }

  async findBy({ name }: findByOptions): Promise<User> {
    const user = await this.db.user.findFirst({ where: { name } })
    if (!user) return null

    return UserMapper.toDomain(user)
  }

  async updateOne(entity: User): Promise<void> {
    const data = UserMapper.toPrisma(entity)

    await this.db.user.update({ data, where: { id: entity.id.toString() } })
  }
}
