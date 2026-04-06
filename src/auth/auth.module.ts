import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from '../common/configuration/environment.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { RegisterUseCase } from './use-cases/register.usecase';
import { GenerateTokensUsecase } from './use-cases/generate-tokens.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase';
import { ModelNames } from '../common/data-access';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.REFRESH_TOKENS, schema: RefreshTokenSchema },
    ]),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<EnvironmentInterface>) => ({
        secret: configService.getOrThrow('jwtSecret'),
        signOptions: {
          expiresIn: configService.getOrThrow('accessTokenExpireIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    RegisterUseCase,
    GenerateTokensUsecase,
    LoginUseCase,
    RefreshTokenUseCase,
    RefreshTokenRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
