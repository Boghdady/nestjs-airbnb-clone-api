import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country } from '../schema/country.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';

@Injectable()
export class SoftDeleteCountryUsecase {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<Country>,
  ) {}

  async execute(id: string): Promise<void> {
    const existingCountry = await this.countryModel.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });

    if (!existingCountry)
      throw new NotFoundException('No country found for this id');

    await this.countryModel.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
