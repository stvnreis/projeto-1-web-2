import {
  PublishArticles,
  publishArticlesRequest,
} from '@/domain/management/application/use-cases/publish-articles'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { ArticlePresenter } from '../presenters/article.presenter'

@Controller('articles/publish')
export class PublishArticlesController {
  constructor(private readonly sut: PublishArticles) {}

  @Post()
  async handle(@Body() data: publishArticlesRequest) {
    const result = await this.sut.execute(data)

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return {
      data: result.value.articles.map((item) => ArticlePresenter.toHttp(item)),
    }
  }
}
