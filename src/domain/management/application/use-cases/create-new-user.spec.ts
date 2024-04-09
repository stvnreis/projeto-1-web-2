import { InMemoryRolesRepository } from 'test/repositories/in-memory-roles.repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository'
import { CreateNewUser } from './create-new-user'
import { makeRole } from 'test/factories/make-role'

describe('unit: Create new User', () => {
  let inMemoryRolesRepository: InMemoryRolesRepository
  let inMemoryUsersRepository: InMemoryUsersRepository
  let sut: CreateNewUser

  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateNewUser(inMemoryUsersRepository, inMemoryRolesRepository)
  })

  it('should be able to create a new user', async () => {
    const role = makeRole()
    await inMemoryRolesRepository.create(role)

    const result = await sut.execute({
      name: 'role-1',
      roleId: role.id.toString(),
      email: 'email-1',
      password: 'senha-1',
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.user.name).toEqual('role-1')
      expect(result.value.user.email).toEqual('email-1')
      expect(result.value.user.password).toEqual('senha-1')
      expect(result.value.user).toMatchObject(inMemoryUsersRepository.items[0])
    }
  })
})
