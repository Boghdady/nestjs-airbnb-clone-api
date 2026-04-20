import { Injectable } from '@nestjs/common';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class FindCountryByIdUsecase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<CountryResponseDto> {
    const country = await this.countryRepository.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!country) throw new NotFoundException('No country found');

    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
