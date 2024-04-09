import { FetchArticles } from '@/domain/management/application/use-cases/fetch-articles'
import { Controller, Get } from '@nestjs/common'
import { ArticlePresenter } from '../presenters/article.presenter'

@Controller('articles')
export class FetchArticlesController {
  constructor(private readonly sut: FetchArticles) {}

  @Get()
  async handle() {
    const result = await this.sut.execute()

    console.log(result)

    if (result.isRight())
      return {
        data: result.value.items.map((item) =>
          ArticlePresenter.toHttp(item.article, item.authors),
        ),
      }
  }
}
