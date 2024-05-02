import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  EditArticle,
  editArticleRequest,
} from '@/domain/management/application/use-cases/edit-article'
import { JwtAuthGuard } from '@/infra/http/auth/guard/jwt-auth.guard'
import { authUserSchema } from '@/domain/management/application/services/auth.service'
import { Request } from 'express'

@Controller('articles')
export class EditArticleController {
  constructor(private readonly sut: EditArticle) {}

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async handle(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: editArticleRequest,
  ) {
    const payload = req.user as authUserSchema
    const result = await this.sut.execute({ articleId: id, payload, ...data })

    if (result.isLeft()) throw new BadRequestException(result.value.message)

    return { message: 'Artigo Alterado com sucesso!' }
  }
}
