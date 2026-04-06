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
import { CountriesService } from './countries.service';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryIdDto } from './dtos/country-id.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { FindAllDto } from './dtos/find-all.dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  async create(@Body() body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.countriesService.create(body);
  }

  @Get('/:id')
  async getCountryById(
    @Param() param: CountryIdDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.getCountryById(param.id);
  }

  @Get()
  async findAll(@Query() query: FindAllDto): Promise<CountryResponseDto[]> {
    return this.countriesService.findAll(query);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCountryById(@Param() param: CountryIdDto): Promise<void> {
    return this.countriesService.deleteById(param.id);
  }

  @Patch('/:id')
  async update(
    @Param() param: CountryIdDto,
    @Body() body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.updateById(param.id, body);
  }
}
