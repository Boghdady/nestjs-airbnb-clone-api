import { Injectable } from '@nestjs/common';
import { CreateCountryUsecase } from './use-cases/create-country.usecase';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryResponseDto } from './dtos/country-response.dto';
import { FindCountryByIdUsecase } from './use-cases/find-country-by-id.usecase';
import { FindAllCountriesUsecase } from './use-cases/find-all-countries.usecase';
import { SoftDeleteCountryUsecase } from './use-cases/soft-delete-country.usecase';
import { UpdateCountryUsecase } from './use-cases/update-country.usecase';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { FindAllDto } from './dtos/find-all.dto';

@Injectable()
export class CountriesService {
  constructor(
    private readonly createCountryUsecase: CreateCountryUsecase,
    private readonly findCountryByIdUsecase: FindCountryByIdUsecase,
    private readonly findAllCountriesUsecase: FindAllCountriesUsecase,
    private readonly softDeleteCountryUsecase: SoftDeleteCountryUsecase,
    private readonly updateCountryUsecase: UpdateCountryUsecase,
  ) {}

  async create(body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.createCountryUsecase.execute(body);
  }

  async getCountryById(id: string): Promise<CountryResponseDto> {
    return this.findCountryByIdUsecase.execute(id);
  }

  async findAll(query: FindAllDto): Promise<CountryResponseDto[]> {
    return this.findAllCountriesUsecase.execute(query);
  }

  async deleteById(id: string): Promise<void> {
    return this.softDeleteCountryUsecase.execute(id);
  }

  async updateById(
    id: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.updateCountryUsecase.execute(id, body);
  }
}
