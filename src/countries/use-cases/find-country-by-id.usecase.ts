import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schema/country.schema';
import { Model } from 'mongoose';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindCountryByIdUsecase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(id: string): Promise<CountryResponseDto> {
    const country = await this.countryModel.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!country) throw new NotFoundException('No country found');

    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
