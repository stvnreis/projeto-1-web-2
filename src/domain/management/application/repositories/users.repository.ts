import { User } from '../../enterprise/entities/user'
import { RepositoryInterface } from './repository-interface'

export interface findByOptions {
  name?: string
}

export abstract class UsersRepository implements RepositoryInterface<User> {
  abstract create(user: User): Promise<void>
  abstract findById(userId: string): Promise<User>
  abstract findByEmail(userEmail: string): Promise<User>
  abstract findAll(): Promise<User[]>
  abstract findBy(options: findByOptions): Promise<User>
  abstract updateOne(entity: User): Promise<void>
  abstract updateMany(entities: User[]): Promise<void>
  abstract delete(id: string): Promise<void>
}
