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
  Req,
  UseGuards,
} from '@nestjs/common'
import { ArticlePresenter } from '../presenters/article.presenter'
import { Request } from 'express'
import { authUserSchema } from '@/domain/management/application/services/auth.service'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'

@Controller('articles/:id/evaluate')
export class EvaluateArticleController {
  constructor(private readonly sut: EvaluateArticle) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async handle(
    @Param('id') id: string,
    @Body() data: evaluateArticleRequest,
    @Req() req: Request,
  ) {
    const payload = req.user as authUserSchema
    const result = await this.sut.execute({ ...data, articleId: id, payload })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { data: ArticlePresenter.toHttp(result.value.article) }
  }
}
