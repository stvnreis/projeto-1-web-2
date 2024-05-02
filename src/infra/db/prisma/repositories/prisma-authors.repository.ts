import {
  AuthorsRepository,
  findManyByOptions,
} from '@/domain/management/application/repositories/authors.repository'
import { Author } from '@/domain/management/enterprise/entities/author'
import { Injectable } from '@nestjs/common'
import { AuthorsMapper } from '../mappers/authors.mapper'
import { PrismaService } from '../prisma.service'
import { undefined } from 'zod'

@Injectable()
export class PrismaAuthorsRepository implements AuthorsRepository {
  constructor(private readonly db: PrismaService) {}

  async updateMany(entities: Author[]): Promise<void> {
    const data = entities.map(AuthorsMapper.toPrisma)

    await this.db.author.updateMany({ data })
  }

  async updateOne(entity: Author): Promise<void> {
    const data = AuthorsMapper.toPrisma(entity)

    await this.db.author.update({ data, where: { id: entity.id.toString() } })
  }

  async findById(authorId: string): Promise<Author> {
    const author = await this.db.author.findFirst({ where: { id: authorId } })
    if (!author) return null

    return AuthorsMapper.toDomain(author)
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.db.author.findMany()

    return authors.map(AuthorsMapper.toDomain)
  }

  async findManyBy({ authorsId }: findManyByOptions): Promise<Author[]> {
    const authors = await this.db.author.findMany({
      where: { id: { in: authorsId } },
    })

    return authors.map(AuthorsMapper.toDomain)
  }

  async create(author: Author): Promise<void> {
    const data = AuthorsMapper.toPrisma(author)

    await this.db.author.create({ data })
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
