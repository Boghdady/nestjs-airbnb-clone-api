import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class CreateCountryUsecase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
    const existingCountry = await this.countryRepository.findOne({
      name: body.name,
      isDeleted: { $ne: true },
    });

    if (existingCountry)
      throw new BadRequestException('Country name already exist');

    const createdCountry = await this.countryRepository.create(body);
    return plainToInstance(CountryResponseDto, createdCountry.toObject());
  }
}
