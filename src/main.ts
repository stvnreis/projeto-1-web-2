import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './infra/env/env.service'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  const logger = new Logger('App')

  app.enableCors({
    origin: true,
    methods: 'GET, POST',
    credentials: true,
  })

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app
    .listen(port)
    .then(() => {
      logger.log(`HTTP server listening on port ${port}`)
    })
    .catch((err) => {
      logger.error(err)
      process.exit(1)
    })
}
bootstrap()
