import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencySchema } from './schema/currency.schema';
import { CreateCurrencyUsecase } from './use-cases/create-currency.usecase';
import { FindCurrencyByIdUsecase } from './use-cases/find-currency-by-id.usecase';
import { FindAllCurrenciesUsecase } from './use-cases/find-all-currencies.usecase';
import { SoftDeleteCurrencyUsecase } from './use-cases/soft-delete-currency.usecase';
import { UpdateCurrencyUsecase } from './use-cases/update-currency.usecase';
import { ModelNames } from '../common/data-access';
import { CurrencyRepository } from './repository/currency.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.CURRENCIES, schema: CurrencySchema },
    ]),
  ],
  controllers: [CurrenciesController],
  providers: [
    CurrenciesService,
    CreateCurrencyUsecase,
    FindCurrencyByIdUsecase,
    FindAllCurrenciesUsecase,
    SoftDeleteCurrencyUsecase,
    UpdateCurrencyUsecase,
    CurrencyRepository,
  ],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
