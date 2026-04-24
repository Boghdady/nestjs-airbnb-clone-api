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
import { UnitCategoriesService } from './unit-categories.service';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryIdDto } from './dtos/unit-category-id.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginatedResult } from '../common/data-access';
import { API_TAGS } from '../common/swagger';
import {
  CreateUnitCategorySwagger,
  DeleteUnitCategorySwagger,
  FindAllUnitCategoriesSwagger,
  FindUnitCategoryByIdSwagger,
  UpdateUnitCategorySwagger,
} from './swagger';
import { Authorize } from '../auth/decorators/roles.decorator';
import { Roles } from '../common/constants';

@ApiTags(API_TAGS.UNIT_CATEGORIES)
@Controller('unit-categories')
export class UnitCategoriesController {
  constructor(private readonly unitCategoriesService: UnitCategoriesService) {}

  @CreateUnitCategorySwagger()
  @Authorize(Roles.SYSTEM_ADMIN)
  @Post()
  async create(
    @Body() body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.create(body);
  }

  @FindUnitCategoryByIdSwagger()
  @Get('/:id')
  async getUnitCategoryById(
    @Param() param: UnitCategoryIdDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.getCurrencyById(param.id);
  }

  @FindAllUnitCategoriesSwagger()
  @Get()
  async findAll(
    @Query() query: FindAllDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.unitCategoriesService.findAll(query);
  }

  @DeleteUnitCategorySwagger()
  @Authorize(Roles.SYSTEM_ADMIN)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUnitCategoryById(
    @Param() param: UnitCategoryIdDto,
  ): Promise<void> {
    return this.unitCategoriesService.deleteById(param.id);
  }

  @UpdateUnitCategorySwagger()
  @Authorize(Roles.SYSTEM_ADMIN)
  @Patch('/:id')
  async update(
    @Param() param: UnitCategoryIdDto,
    @Body() body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoriesService.updateById(param.id, body);
  }
}
