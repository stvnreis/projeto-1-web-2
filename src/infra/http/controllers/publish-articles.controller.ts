import { PublishArticles } from '@/domain/management/application/use-cases/publish-articles'
import {
  BadRequestException,
  Controller,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ArticlePresenter } from '../presenters/article.presenter'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'
import { Request } from 'express'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

@Controller('articles/:id/publish')
export class PublishArticlesController {
  constructor(private readonly sut: PublishArticles) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async handle(@Req() req: Request, @Param('id') id: string) {
    const payload = req.user as authUserSchema

    const result = await this.sut.execute({ articleId: id, payload })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return {
      data: ArticlePresenter.toHttp(result.value.article),
    }
  }
}
