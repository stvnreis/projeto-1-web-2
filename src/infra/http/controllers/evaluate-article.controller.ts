import {
  EvaluateArticle,
  evaluateArticleRequest,
} from '@/domain/management/application/use-cases/evaluate-article'
import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { ArticlePresenter } from '../presenters/article.presenter'

@Controller('articles/:id/evaluate')
export class EvaluateArticleController {
  constructor(private readonly sut: EvaluateArticle) {}

  @Post()
  async handle(@Param('id') id: string, @Body() data: evaluateArticleRequest) {
    const result = await this.sut.execute({ ...data, articleId: id })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: ArticlePresenter.toHttp(result.value.article) }
  }
}
