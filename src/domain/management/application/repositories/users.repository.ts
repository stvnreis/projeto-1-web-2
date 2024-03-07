import { User } from '../../enterprise/entities/user'

export interface findByOptions {
  name?: string
}

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>
  abstract findById(userId: string): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findBy(options: findByOptions): Promise<User>
}
