import { Global, Module } from '@nestjs/common'
import { AuthService } from '@/domain/management/application/services/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import {
  JwtStrategy,
  PassportJwtStrategy,
} from '@/infra/http/auth/strategy/jwt.strategy'
import { JwtAuthService } from '@/infra/http/auth/services/jwt-auth.service'

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN_SECRET,
    }),
  ],
  providers: [
    { provide: AuthService, useClass: JwtAuthService },
    { provide: JwtStrategy, useClass: PassportJwtStrategy },
  ],
  exports: [AuthService, JwtStrategy],
})
export class JwtAuthModule {}
