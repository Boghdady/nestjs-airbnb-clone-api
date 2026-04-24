import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dtos/create-city.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { PaginatedResult } from '../common/data-access';
import { UpdateCityDto } from './dtos/update-city.dto';
import { API_TAGS } from '../common/swagger';
import {
  CreateCitySwagger,
  DeleteCitySwagger,
  FindAllCitiesSwagger,
  FindCityByIdSwagger,
  UpdateCitySwagger,
} from './swagger';
import { Roles } from '../common/constants';
import { Authorize } from '../auth/decorators/roles.decorator';

@ApiTags(API_TAGS.CITIES)
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @CreateCitySwagger()
  @Authorize(Roles.SYSTEM_ADMIN)
  @Post()
  async createCity(@Body() body: CreateCityDto): Promise<CityResponseDto> {
    return this.citiesService.createCity(body);
  }

  @FindAllCitiesSwagger()
  @Get()
  async findAllCities(
    @Query() query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.citiesService.findAllCities(query);
  }

  @FindCityByIdSwagger()
  @Get('/:id')
  async findCityById(@Param('id') cityId: string): Promise<CityResponseDto> {
    return this.citiesService.findCityById(cityId);
  }

  @UpdateCitySwagger()
  @Authorize(Roles.SYSTEM_ADMIN)
  @Patch('/:id')
  async updateCity(
    @Param('id') cityId: string,
    @Body() body: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.citiesService.updateCity(cityId, body);
  }

  @DeleteCitySwagger()
  @Authorize(Roles.SYSTEM_ADMIN)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCity(@Param('id') cityId: string): Promise<void> {
    return this.citiesService.deleteCity(cityId);
  }
}
