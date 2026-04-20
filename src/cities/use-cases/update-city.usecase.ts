import { Injectable, NotFoundException } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { UpdateCityDto } from '../dtos/update-city.dto';
import { CityResponseDto } from '../dtos/city-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateCityUsecase {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(cityId: string, body: UpdateCityDto): Promise<CityResponseDto> {
    // check city exists
    const city = await this.cityRepository.findOne({
      _id: cityId,
      isDeleted: false,
    });
    if (!city) throw new NotFoundException('City not found');

    // check name duplication per-country
    const existingCityByName = await this.cityRepository.findOne({
      name: body.name,
      country: city.country,
      isDeleted: false,
      _id: { $ne: cityId },
    });

    if (existingCityByName)
      throw new BadRequestException('City name already exists');

    const updatedCity = await this.cityRepository.findByIdAndUpdate(
      cityId,
      body,
    );

    return plainToInstance(CityResponseDto, updatedCity?.toObject());
  }
}
