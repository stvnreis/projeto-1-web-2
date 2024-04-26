import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { authUserSchema } from '@/domain/management/application/services/auth.service'

export abstract class JwtStrategy {
  abstract validate(payload: authUserSchema)
}

@Injectable()
export class PassportJwtStrategy
  extends PassportStrategy(Strategy)
  implements JwtStrategy
{
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_TOKEN_SECRET,
    })
  }

  validate(payload: authUserSchema) {
    return payload
  }
}
