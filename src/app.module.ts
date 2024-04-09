import { Module } from '@nestjs/common'
import { EnvModule } from './infra/env/env.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './infra/env/env'
import { DbModule } from './infra/db/db.module'
import { HttpModule } from './infra/http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    DbModule,
    HttpModule,
  ],
})
export class AppModule {}
