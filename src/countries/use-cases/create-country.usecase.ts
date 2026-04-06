import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schema/country.schema';
import { Model } from 'mongoose';
import { CreateCountryDto } from '../dtos/create-country.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateCountryUsecase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(body: CreateCountryDto): Promise<CountryResponseDto> {
    const existingCountry = await this.countryModel.findOne({
      name: body.name,
      isDeleted: { $ne: true },
    });

    if (existingCountry)
      throw new BadRequestException('Country name already exist');

    const createdCountry = await this.countryModel.create(body);
    return plainToInstance(CountryResponseDto, createdCountry.toObject());
  }
}
