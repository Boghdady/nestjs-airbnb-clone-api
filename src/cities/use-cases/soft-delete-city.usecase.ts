import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';

@Injectable()
export class SoftDeleteCityUsecase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(cityId: string): Promise<void> {
    const existingCity = await this.cityRepository.findOne({
      _id: cityId,
      isDeleted: false,
    });

    if (!existingCity)
      throw new NotFoundException('City not fount to be deleted');

    await this.cityRepository.findByIdAndDelete(cityId);
  }
}
