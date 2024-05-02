import { Controller, Get, UseGuards } from '@nestjs/common'
import { FetchAuthors } from '@/domain/management/application/use-cases/fetch-authors'
import { AuthorPresenter } from '@/infra/http/presenters/author.presenter'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'

@Controller('authors')
export class FetchAuthorsController {
  constructor(private readonly sut: FetchAuthors) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle() {
    const result = await this.sut.execute()
    if (result.isRight())
      return { data: result.value.authors.map(AuthorPresenter.toHttp) }
  }
}
