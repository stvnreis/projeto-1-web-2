import { FindArticleById } from '@/domain/management/application/use-cases/find-article-by-id'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ArticlePresenter } from '../presenters/article.presenter'

@Controller('articles/:id')
export class FindArticleByIdController {
  constructor(private readonly sut: FindArticleById) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.sut.execute({ articleId: id })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: ArticlePresenter.toHttp(result.value.article) }
  }
}
