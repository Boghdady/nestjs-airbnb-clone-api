import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CountrySchema } from './schema/country.schema';
import { CreateCountryUsecase } from './use-cases/create-country.usecase';
import { FindCountryByIdUsecase } from './use-cases/find-country-by-id.usecase';
import { FindAllCountriesUsecase } from './use-cases/find-all-countries.usecase';
import { SoftDeleteCountryUsecase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUsecase } from './use-cases/update-country.usecase';
import { ModelNames } from '../common/data-access';
import { CountryRepository } from './repository/country.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.COUNTRIES, schema: CountrySchema },
    ]),
  ],
  controllers: [CountriesController],
  providers: [
    CountriesService,
    CreateCountryUsecase,
    FindCountryByIdUsecase,
    FindAllCountriesUsecase,
    SoftDeleteCountryUsecase,
    UpdateCountryUsecase,
    CountryRepository,
  ],
  exports: [CountriesService],
})
export class CountriesModule {}
