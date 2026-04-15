import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { Currency } from '../schema/currency.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Injectable()
export class CurrencyRepository extends BaseRepository<Currency> {
  constructor(
    @InjectModel(ModelNames.CURRENCIES)
    private readonly currencyModel: Model<HydratedDocument<Currency>>,
  ) {
    super(currencyModel);
  }
}
