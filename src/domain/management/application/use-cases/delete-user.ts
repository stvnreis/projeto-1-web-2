import { authUserSchema } from '@/domain/management/application/services/auth.service'
import { Either, left, right } from '@/core/either'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'

export interface deleteUserRequest {
  payload: authUserSchema
  userId: string
}

export type deleteUserResponse = Either<Error, void>

export class DeleteUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    payload,
    userId,
  }: deleteUserRequest): Promise<deleteUserResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) return left(new Error('Usuário não encontrado'))

    if (!payload.role.canManageUsers)
      return left(new Error('Usuário não possui permissão.'))

    await this.usersRepository.delete(user.id.toString())

    return right(null)
  }
}
