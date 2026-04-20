import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { CountryRepository } from '../repository/country.repository';

@Injectable()
export class SoftDeleteCountryUsecase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: string): Promise<void> {
    const existingCountry = await this.countryRepository.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });

    if (!existingCountry)
      throw new NotFoundException('No country found for this id');

    await this.countryRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
