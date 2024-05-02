import { Injectable } from '@nestjs/common'
import { DeleteUser } from '@/domain/management/application/use-cases/delete-user'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'

@Injectable()
export class DeleteUserUseCase extends DeleteUser {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository)
  }
}
