import {
  SubmitArticle,
  submitArticleRequest,
} from '@/domain/management/application/use-cases/submit-article'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ArticlePresenter } from '../presenters/article.presenter'
import { Request } from 'express'
import { authUserSchema } from '@/domain/management/application/services/auth.service'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'

@Controller('articles')
export class SubmitArticleController {
  constructor(private readonly sut: SubmitArticle) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async handle(@Body() data: submitArticleRequest, @Req() req: Request) {
    const payload = req.user as authUserSchema

    const result = await this.sut.execute({ ...data, payload })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return {
      data: ArticlePresenter.toHttp(result.value.article),
      message: 'Artigo publicado com sucesso!',
    }
  }
}
