import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { RefreshToken } from '../../auth/schemas/refresh-token.schema';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor(
    @InjectModel(ModelNames.REFRESH_TOKENS)
    private readonly refreshTokenModel: Model<HydratedDocument<RefreshToken>>,
  ) {
    super(refreshTokenModel);
  }
}
