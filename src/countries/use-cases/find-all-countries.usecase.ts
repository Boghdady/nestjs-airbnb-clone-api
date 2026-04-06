import { Injectable } from '@nestjs/common';
import { Country } from '../schema/country.schema';
import { QueryFilter } from 'mongoose';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';
import { FindAllDto } from '../dtos/find-all.dto';
import { CountryRepository } from '../repository/country.repository';
import { PaginatedResult } from '../../common/data-access';

@Injectable()
export class FindAllCountriesUsecase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    query: FindAllDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    const matchQuery: QueryFilter<Country> = { isDeleted: { $ne: true } };
    if (query?.name) matchQuery.name = { $regex: query.name, $options: 'i' };
    if (query?.countryCode) matchQuery.countryCode = query.countryCode;

    const result = await this.countryRepository.findPaginated(matchQuery, {
      page: query?.page,
      limit: query?.limit,
      ignoreLimit: query?.ignoreLimit,
      lean: true,
    });

    return plainToInstance(PaginatedResult<CountryResponseDto>, result);
  }
}
