import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { Country } from '../schema/country.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    @InjectModel(ModelNames.COUNTRIES)
    private readonly countryModel: Model<HydratedDocument<Country>>,
  ) {
    super(countryModel);
  }
}
