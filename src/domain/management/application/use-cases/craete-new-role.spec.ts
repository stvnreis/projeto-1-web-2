import { InMemoryRolesRepository } from 'test/repositories/in-memory-roles.repository'
import { CreateNewRole, createNewRoleRequest } from './create-new-role'

describe('unit: Create new Role', () => {
  let inMemoryRolesRepository: InMemoryRolesRepository
  let sut: CreateNewRole

  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository()
    sut = new CreateNewRole(inMemoryRolesRepository)
  })

  it('should be able to create a new role', async () => {
    const role = {
      name: 'Administrador',
      canSubmitEditDeleteArticles: true,
      canManageUsers: true,
      canDeleteArticlesFromAnyUser: true,
      canSubmitArticleToEvaluation: true,
      canEvaluate: true,
      canPubilshArticle: true,
    } as createNewRoleRequest

    const result = await sut.execute({ ...role })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.role.name).toEqual(role.name)
    }
  })
})
