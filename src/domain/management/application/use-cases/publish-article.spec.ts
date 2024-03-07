import { InMemoryRolesRepository } from 'test/repositories/in-memory-roles.repository'
import { PublishArticle } from './publish-article'
import { InMemoryArticlesRepository } from 'test/repositories/in-memory-articles.repository'
import { InMemoryAuthorsRepository } from 'test/repositories/in-memory-authors.repository'
import { makeRole } from 'test/factories/make-role'
import { makeUser } from 'test/factories/make-user'
import { makeAuthor } from 'test/factories/make-author'
import { File } from '../../enterprise/entities/value-objects/file'

describe('unit: Register New Article', async () => {
  let inMemoryRolesRepository: InMemoryRolesRepository
  let inMemoryAuthorsrepository: InMemoryAuthorsRepository
  let inMemoryArticlesRepository: InMemoryArticlesRepository
  let sut: PublishArticle

  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository()
    inMemoryAuthorsrepository = new InMemoryAuthorsRepository()
    inMemoryArticlesRepository = new InMemoryArticlesRepository()
    sut = new PublishArticle(
      inMemoryArticlesRepository,
      inMemoryAuthorsrepository,
      inMemoryRolesRepository,
    )
  })

  it('should be able to publish an article', async () => {
    const role = makeRole()
    const user = makeUser({ roleId: role.id })

    const author = makeAuthor()

    await Promise.all([
      inMemoryRolesRepository.create(role),
      inMemoryAuthorsrepository.create(author),
    ])

    const result = await sut.execute({
      authorsId: [author.id.toString()],
      file: File.create({
        type: 'PDF',
        url: 'url-1.com/file.pdf',
      }),
      user: {
        id: user.id.toString(),
        role: {
          id: role.id.toString(),
          type: role.type,
        },
      },
      sinopse: 'sinopse-1',
      title: 'title-1',
    })

    expect(result.isRight()).toBeTruthy()
  })
})
