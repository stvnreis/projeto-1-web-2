import { CreateNewUser } from '@/domain/management/application/use-cases/create-new-user'
import { Module } from '@nestjs/common'
import { CreateNewUserUseCase } from './create-new-user.use-case'
import { EditUser } from '@/domain/management/application/use-cases/edit-user'
import { EditUserUseCase } from './edit-user.use-case'
import { SubmitArticle } from '@/domain/management/application/use-cases/submit-article'
import { SubmitArticleUseCase } from './publish-article.use-case'
import { PublishArticles } from '@/domain/management/application/use-cases/publish-articles'
import { PublishArticlesUseCase } from './publish-articles.use-case'
import { EvaluateArticle } from '@/domain/management/application/use-cases/evaluate-article'
import { EvaluateArticleUseCase } from './evaluate-article.use-case'
import { FindArticleById } from '@/domain/management/application/use-cases/find-article-by-id'
import { FindArticleByIdUseCase } from './find-article-by-id.use-case'
import { FetchArticles } from '@/domain/management/application/use-cases/fetch-articles'
import { FetchArticlesUseCase } from './fetch-articles.use-case'
import { FetchUsers } from '@/domain/management/application/use-cases/fetch-users'
import { FetchUsersUseCase } from './fetch-users.use-case'
import { FindUserById } from '@/domain/management/application/use-cases/find-user-by-id'
import { FindUserByIdUseCase } from './find-user-by-id.use-case'
import { AuthenticateUser } from '@/domain/management/application/use-cases/authenticate-user'
import { AuthenticateUserUseCase } from '@/infra/use-cases/authenticate-user.use-case'
import { CreateNewRole } from '@/domain/management/application/use-cases/create-new-role'
import { CreateNewRoleUseCase } from '@/infra/use-cases/create-new-role.use-case'
import { FetchRoles } from '@/domain/management/application/use-cases/fetch-roles'
import { FetchRolesUseCase } from '@/infra/use-cases/fetch-roles.use-case'
import { DeleteUser } from '@/domain/management/application/use-cases/delete-user'
import { DeleteUserUseCase } from '@/infra/use-cases/delete-user.use-case'
import { DeleteArticle } from '@/domain/management/application/use-cases/delete-article'
import { DeleteArticleUseCase } from '@/infra/use-cases/delete-article.use-case'
import { EditArticle } from '@/domain/management/application/use-cases/edit-article'
import { EditArticleUseCase } from '@/infra/use-cases/edit-article.use-case'
import { FetchAuthors } from '@/domain/management/application/use-cases/fetch-authors'
import { FetchAuthorsUseCase } from '@/infra/use-cases/fetch-authors.use-case'

@Module({
  providers: [
    { provide: CreateNewUser, useClass: CreateNewUserUseCase },
    { provide: EditUser, useClass: EditUserUseCase },
    { provide: SubmitArticle, useClass: SubmitArticleUseCase },
    { provide: PublishArticles, useClass: PublishArticlesUseCase },
    { provide: EvaluateArticle, useClass: EvaluateArticleUseCase },
    { provide: FindArticleById, useClass: FindArticleByIdUseCase },
    { provide: FetchArticles, useClass: FetchArticlesUseCase },
    { provide: FetchUsers, useClass: FetchUsersUseCase },
    { provide: FindUserById, useClass: FindUserByIdUseCase },
    { provide: AuthenticateUser, useClass: AuthenticateUserUseCase },
    { provide: CreateNewRole, useClass: CreateNewRoleUseCase },
    { provide: FetchRoles, useClass: FetchRolesUseCase },
    { provide: DeleteUser, useClass: DeleteUserUseCase },
    { provide: DeleteArticle, useClass: DeleteArticleUseCase },
    { provide: EditArticle, useClass: EditArticleUseCase },
    { provide: FetchAuthors, useClass: FetchAuthorsUseCase },
  ],
  exports: [
    CreateNewUser,
    EditUser,
    SubmitArticle,
    PublishArticles,
    EvaluateArticle,
    FindArticleById,
    FetchArticles,
    FetchUsers,
    FindUserById,
    AuthenticateUser,
    CreateNewRole,
    FetchRoles,
    DeleteUser,
    DeleteArticle,
    EditArticle,
    FetchAuthors,
  ],
})
export class UseCasesModule {}
