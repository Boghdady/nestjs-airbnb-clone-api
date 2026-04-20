import { Injectable } from '@nestjs/common';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class UpdateCountryUsecase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    countryId: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    // check if the country exists
    const country = await this.countryRepository.findOne({
      _id: countryId,
      isDeleted: { $ne: true },
    });

    if (!country) throw new BadRequestException('Country not found');

    // check if the name is already taken
    if (body?.name) {
      const existingCountry = await this.countryRepository.findOne({
        name: body.name,
        isDeleted: { $ne: true },
        _id: { $ne: countryId },
      });

      if (existingCountry)
        throw new BadRequestException('Country name already exists');
    }

    const updatedCountry = await this.countryRepository.findByIdAndUpdate(
      countryId,
      body,
      { returnDocument: 'after' },
    );

    return plainToInstance(CountryResponseDto, updatedCountry?.toObject());
  }
}
