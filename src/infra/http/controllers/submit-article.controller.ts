import {
  SubmitArticle,
  submitArticleRequest,
} from '@/domain/management/application/use-cases/submit-article'
import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { ArticlePresenter } from '../presenters/article.presenter'

@Controller('articles')
export class SubmitArticleController {
  constructor(private readonly sut: SubmitArticle) {}

  @Post()
  async handle(@Body() data: submitArticleRequest) {
    const result = await this.sut.execute(data)

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return {
      data: ArticlePresenter.toHttp(result.value.article),
      message: 'Artigo publicado com sucesso!',
    }
  }
}
