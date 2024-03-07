import { InMemoryArticlesRepository } from 'test/repositories/in-memory-articles.repository'
import { InMemoryAuthorsRepository } from 'test/repositories/in-memory-authors.repository'
import { InMemoryRolesRepository } from 'test/repositories/in-memory-roles.repository'
import { EditArticle } from './edit-article'
import { makeRole } from 'test/factories/make-role'
import { makeUser } from 'test/factories/make-user'
import { makeAuthor } from 'test/factories/make-author'
import { makeArticle } from 'test/factories/make-article'

describe('unit: Edit Article', () => {
  let inMemoryRolesRepository: InMemoryRolesRepository
  let inMemoryAuthorsRepository: InMemoryAuthorsRepository
  let inMemoryArticlesRepository: InMemoryArticlesRepository

  let sut: EditArticle

  beforeEach(() => {
    inMemoryRolesRepository = new InMemoryRolesRepository()
    inMemoryAuthorsRepository = new InMemoryAuthorsRepository()
    inMemoryArticlesRepository = new InMemoryArticlesRepository()

    sut = new EditArticle(
      inMemoryArticlesRepository,
      inMemoryAuthorsRepository,
      inMemoryRolesRepository,
    )
  })

  it('should be able to edit an article if role allows', async () => {
    const role = makeRole()
    const user = makeUser({ roleId: role.id })

    const author = makeAuthor()

    const article = makeArticle()

    await Promise.all([
      inMemoryAuthorsRepository.create(author),
      inMemoryArticlesRepository.create(article),
      inMemoryRolesRepository.create(role),
    ])

    const result = await sut.execute({
      authorsId: [author.id.toString()],
      articleId: article.id.toString(),
      file: article.file,
      sinopse: article.sinopse,
      title: article.title,
      user: {
        id: user.id.toString(),
        role: {
          id: role.id.toString(),
          type: role.type,
        },
      },
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.article.authorsId[0].toString()).toEqual(
        author.id.toString(),
      )
    }
  })
})
