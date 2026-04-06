import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schema/country.schema';
import { Model, QueryFilter } from 'mongoose';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';
import { FindAllDto } from '../dtos/find-all.dto';

@Injectable()
export class FindAllCountriesUsecase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(query: FindAllDto): Promise<CountryResponseDto[]> {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const matchQuery: QueryFilter<Country> = { isDeleted: { $ne: true } };

    if (query?.name) matchQuery.name = { $regex: query.name, $options: 'i' };
    if (query?.countryCode) matchQuery.countryCode = query.countryCode;

    const countries = await this.countryModel
      .find(matchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return countries.map((country) =>
      plainToInstance(CountryResponseDto, country.toObject()),
    );
  }
}
