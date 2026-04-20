import { Injectable } from '@nestjs/common';
import { CreateCityUsecase } from './use-cases/create-city.usecase';
import { FindAllCitiesUsecase } from './use-cases/find-all-cities.usecase';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { PaginatedResult } from '../common/data-access';
import { SoftDeleteCityUsecase } from './use-cases/soft-delete-city.usecase';
import { UpdateCityUsecase } from './use-cases/update-city.usecase';
import { FindCityByIdUsecase } from './use-cases/find-city-by-id.usecase';
import { UpdateCityDto } from './dtos/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(
    private readonly createCityUsecase: CreateCityUsecase,
    private readonly findAllCitiesUsecase: FindAllCitiesUsecase,
    private readonly deleteCityUsecase: SoftDeleteCityUsecase,
    private readonly updateCityUsecase: UpdateCityUsecase,
    private readonly findCityByIdUsecase: FindCityByIdUsecase,
  ) {}

  async createCity(body: CreateCityDto): Promise<CityResponseDto> {
    return this.createCityUsecase.execute(body);
  }

  async findAllCities(
    query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.findAllCitiesUsecase.execute(query);
  }

  async updateCity(
    cityId: string,
    body: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.updateCityUsecase.execute(cityId, body);
  }

  async findCityById(cityId: string): Promise<CityResponseDto> {
    return this.findCityByIdUsecase.execute(cityId);
  }

  async deleteCity(cityId: string): Promise<void> {
    return this.deleteCityUsecase.execute(cityId);
  }
}
