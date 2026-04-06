import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access';
import { CitySchema } from './schema/city.schema';
import { CountriesModule } from '../countries/countries.module';
import { CreateCityUsecase } from './use-cases/create-city.usecase';
import { CityRepository } from './repository/city.repository';
import { FindAllCitiesUsecase } from './use-cases/find-all-cities.usecase';
import { SoftDeleteCityUsecase } from './use-cases/soft-delete-city.usecase';
import { UpdateCityUsecase } from './use-cases/update-city.usecase';
import { FindCityByIdUsecase } from './use-cases/find-city-by-id.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ModelNames.CITIES,
        schema: CitySchema,
      },
    ]),
    CountriesModule,
  ],
  providers: [
    CitiesService,
    CreateCityUsecase,
    FindAllCitiesUsecase,
    SoftDeleteCityUsecase,
    UpdateCityUsecase,
    FindCityByIdUsecase,
    CityRepository,
  ],
  controllers: [CitiesController],
})
export class CitiesModule {}
