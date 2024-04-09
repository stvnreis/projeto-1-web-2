import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from '@/domain/management/application/repositories/users.repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository'
import { RolesRepository } from '@/domain/management/application/repositories/roles.repository'
import { PrismaRolesRepository } from './prisma/repositories/prisma-roles.repository'
import { ArticlesRepository } from '@/domain/management/application/repositories/articles.repository'
import { PrismaArticlesRepostory } from './prisma/repositories/prisma-articles.repository'
import { AuthorsRepository } from '@/domain/management/application/repositories/authors.repository'
import { PrismaAuthorsRepository } from './prisma/repositories/prisma-authors.repository'

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: RolesRepository, useClass: PrismaRolesRepository },
    { provide: ArticlesRepository, useClass: PrismaArticlesRepostory },
    { provide: AuthorsRepository, useClass: PrismaAuthorsRepository },
  ],
  exports: [
    UsersRepository,
    RolesRepository,
    ArticlesRepository,
    AuthorsRepository,
  ],
})
export class DbModule {}
