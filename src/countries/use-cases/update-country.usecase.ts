import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schema/country.schema';
import { Model } from 'mongoose';
import { UpdateCountryDto } from '../dtos/update-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateCountryUsecase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(
    countryId: string,
    body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    // check if the country exists
    const country = await this.countryModel.findOne({
      _id: countryId,
      isDeleted: { $ne: true },
    });

    if (!country) throw new BadRequestException('Country not found');

    // check if the name is already taken
    if (body?.name) {
      const existingCountry = await this.countryModel.findOne({
        name: body.name,
        isDeleted: { $ne: true },
        _id: { $ne: countryId },
      });

      if (existingCountry)
        throw new BadRequestException('Country name already exists');
    }

    const updatedCountry = await this.countryModel.findByIdAndUpdate(
      countryId,
      body,
      { returnDocument: 'after' },
    );

    return plainToInstance(CountryResponseDto, updatedCountry?.toObject());
  }
}
