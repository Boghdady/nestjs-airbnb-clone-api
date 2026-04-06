import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { CityResponseDto } from '../dtos/city-response.dto';
import { CreateCityDto } from '../dtos/create-city.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { CountriesService } from '../../countries/countries.service';

@Injectable()
export class CreateCityUsecase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly countriesService: CountriesService,
  ) {}

  async execute(body: CreateCityDto): Promise<CityResponseDto> {
    // validate city name not duplicated per country
    const existingCityByName = await this.cityRepository.findOne({
      name: body.name,
      country: body.country,
      isDeleted: false,
    });

    if (existingCityByName)
      throw new BadRequestException('City already exists');

    // validate country id
    await this.countriesService.getCountryById(body.country);

    const city = await this.cityRepository.create(body);
    return plainToInstance(CityResponseDto, city.toObject());
  }
}
