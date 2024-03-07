import {
  UsersRepository,
  findByOptions,
} from '@/domain/management/application/repositories/users.repository'
import { User } from '@/domain/management/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = []

  async findBy({ name }: findByOptions): Promise<User> {
    const user = this.items.find((item) => item.name === name)
    if (!user) return null

    return user
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async findById(userId: string): Promise<User> {
    const user = this.items.find((item) => item.id.toString() === userId)
    if (!user) return null

    return user
  }

  async findAll(): Promise<User[]> {
    return this.items
  }
}
