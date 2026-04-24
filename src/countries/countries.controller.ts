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
import { CountriesService } from './countries.service';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CreateCountryDto } from './dtos/create-country.dto';
import { CountryIdDto } from './dtos/country-id.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginatedResult } from '../common/data-access';
import { API_TAGS } from '../common/swagger';
import {
  CreateCountrySwagger,
  DeleteCountrySwagger,
  FindAllCountriesSwagger,
  FindCountryByIdSwagger,
  UpdateCountrySwagger,
} from './swagger';
import { Roles } from '../common/constants';
import { Authorize } from '../auth/decorators/roles.decorator';

@ApiTags(API_TAGS.COUNTRIES)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @CreateCountrySwagger()
  @Post()
  @Authorize(Roles.SYSTEM_ADMIN)
  async create(@Body() body: CreateCountryDto): Promise<CountryResponseDto> {
    return this.countriesService.create(body);
  }

  @FindCountryByIdSwagger()
  @Get('/:id')
  async getCountryById(
    @Param() param: CountryIdDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.getCountryById(param.id);
  }

  @FindAllCountriesSwagger()
  @Get()
  async findAll(
    @Query() query: FindAllDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.countriesService.findAll(query);
  }

  @DeleteCountrySwagger()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Authorize(Roles.SYSTEM_ADMIN)
  async deleteCountryById(@Param() param: CountryIdDto): Promise<void> {
    return this.countriesService.deleteById(param.id);
  }

  @UpdateCountrySwagger()
  @Patch('/:id')
  @Authorize(Roles.SYSTEM_ADMIN)
  async update(
    @Param() param: CountryIdDto,
    @Body() body: UpdateCountryDto,
  ): Promise<CountryResponseDto> {
    return this.countriesService.updateById(param.id, body);
  }
}
