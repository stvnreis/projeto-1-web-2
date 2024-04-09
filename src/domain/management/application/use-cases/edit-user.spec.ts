import { InMemoryRolesRepository } from 'test/repositories/in-memory-roles.repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-user.repository'
import { EditUser } from './edit-user'
import { makeUser } from 'test/factories/make-user'
import { makeRole } from 'test/factories/make-role'

describe('unit: Edit User', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository
  let inMemoryRolesRepository: InMemoryRolesRepository

  let sut: EditUser

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryRolesRepository = new InMemoryRolesRepository()

    sut = new EditUser(inMemoryUsersRepository, inMemoryRolesRepository)
  })

  it('should be able to edit an existing user', async () => {
    const adminRole = makeRole({ name: 'Administrador', type: 'ADMIN' })
    const adminUser = makeUser({ roleId: adminRole.id })

    const role = makeRole()
    const user = makeUser({ roleId: role.id })
    const newRole = makeRole({ canManageUsers: false })

    await Promise.all([
      inMemoryRolesRepository.create(role),
      inMemoryUsersRepository.create(user),
      inMemoryRolesRepository.create(adminRole),
      inMemoryUsersRepository.create(adminUser),
      inMemoryRolesRepository.create(newRole),
    ])

    const result = await sut.execute({
      id: user.id.toString(),
      name: 'user-1',
      roleId: adminRole.id.toString(),
      user: {
        id: adminUser.id.toString(),
        role: {
          id: adminRole.id.toString(),
          type: adminRole.type,
        },
      },
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.user.name).toEqual('user-1')
      expect(result.value.user.roleId.toString()).toEqual(
        adminRole.id.toString(),
      )
    }
  })
})
