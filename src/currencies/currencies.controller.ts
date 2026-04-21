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
import { CurrenciesService } from './currencies.service';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyIdDto } from './dtos/currency-id.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginatedResult } from '../common/data-access';
import { API_TAGS } from '../common/swagger';
import {
  CreateCurrencySwagger,
  DeleteCurrencySwagger,
  FindAllCurrenciesSwagger,
  FindCurrencyByIdSwagger,
  UpdateCurrencySwagger,
} from './swagger';

@ApiTags(API_TAGS.CURRENCIES)
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @CreateCurrencySwagger()
  @Post()
  async create(@Body() body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    return this.currenciesService.create(body);
  }

  @FindCurrencyByIdSwagger()
  @Get('/:id')
  async getCurrencyById(
    @Param() param: CurrencyIdDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.getCurrencyById(param.id);
  }

  @FindAllCurrenciesSwagger()
  @Get()
  async findAll(
    @Query() query: FindAllDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    return this.currenciesService.findAll(query);
  }

  @DeleteCurrencySwagger()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCurrencyById(@Param() param: CurrencyIdDto): Promise<void> {
    return this.currenciesService.deleteById(param.id);
  }

  @UpdateCurrencySwagger()
  @Patch('/:id')
  async update(
    @Param() param: CurrencyIdDto,
    @Body() body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currenciesService.updateById(param.id, body);
  }
}
