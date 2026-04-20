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
import { UnitCategoriesService } from './unit-categories.service';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryIdDto } from './dtos/unit-category-id.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginatedResult } from '../common/data-access';

@Controller('unit-categories')
export class UnitCategoriesController {
  constructor(private readonly unitCategoriesService: UnitCategoriesService) {}

  @Post()
  async create(
    @Body() body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.create(body);
  }

  @Get('/:id')
  async getUnitCategoryById(
    @Param() param: UnitCategoryIdDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.getCurrencyById(param.id);
  }

  @Get()
  async findAll(
    @Query() query: FindAllDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.unitCategoriesService.findAll(query);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUnitCategoryById(
    @Param() param: UnitCategoryIdDto,
  ): Promise<void> {
    return this.unitCategoriesService.deleteById(param.id);
  }

  @Patch('/:id')
  async update(
    @Param() param: UnitCategoryIdDto,
    @Body() body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.updateById(param.id, body);
  }
}
