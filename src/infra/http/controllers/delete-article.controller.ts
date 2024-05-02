import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common'
import { DeleteArticle } from '@/domain/management/application/use-cases/delete-article'
import { Request } from 'express'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

@Controller('articles')
export class DeleteArticleController {
  constructor(private readonly sut: DeleteArticle) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async handle(@Req() req: Request, @Param('id') id: string) {
    const payload = req.user as authUserSchema

    const result = await this.sut.execute({ articleId: id, payload })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { message: 'Artigo removido com sucesso.' }
  }
}
