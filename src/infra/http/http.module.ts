import { Module } from '@nestjs/common'
import { UseCasesModule } from '../use-cases/use-cases.module'
import { CreateNewUserController } from './controllers/create-new-user.controller'
import { EditUserController } from './controllers/edit-user.controller'
import { SubmitArticleController } from './controllers/submit-article.controller'
import { PublishArticlesController } from './controllers/publish-articles.controller'
import { EvaluateArticleController } from './controllers/evaluate-article.controller'
import { FindArticleByIdController } from './controllers/find-article-by-id.controller'
import { FetchArticlesController } from './controllers/fetch-articles.controller'
import { FetchUsersController } from './controllers/fetch-users.controller'
import { FindUserByIdController } from './controllers/find-user-by-id.controller'

@Module({
  imports: [UseCasesModule],
  controllers: [
    CreateNewUserController,
    EditUserController,
    SubmitArticleController,
    PublishArticlesController,
    EvaluateArticleController,
    FindArticleByIdController,
    FetchArticlesController,
    FetchUsersController,
    FindUserByIdController,
  ],
})
export class HttpModule {}