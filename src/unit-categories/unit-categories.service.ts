import { Injectable } from '@nestjs/common';
import { CreateUnitCategoryUsecase } from './use-cases/create-unit-category.usecase';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { FindUnitCategoryByIdUsecase } from './use-cases/find-unit-category-by-id.usecase';
import { FindAllUnitCategoriesUsecase } from './use-cases/find-all-unit-categories.usecase';
import { SoftDeleteUnitCategoryUsecase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUnitCategoryUsecase } from './use-cases/update-unit-category.usecase';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { FindAllDto } from './dtos/find-all.dto';
import { PaginatedResult } from '../common/data-access';

@Injectable()
export class UnitCategoriesService {
  constructor(
    private readonly createUnitCategoryUsecase: CreateUnitCategoryUsecase,
    private readonly findUnitCategoryByIdUsecase: FindUnitCategoryByIdUsecase,
    private readonly findAllUnitCategoriesUsecase: FindAllUnitCategoriesUsecase,
    private readonly softDeleteUnitCategoryUsecase: SoftDeleteUnitCategoryUsecase,
    private readonly updateUnitCategoryUsecase: UpdateUnitCategoryUsecase,
  ) {}

  async create(body: CreateUnitCategoryDto): Promise<UnitCategoryResponseDto> {
    return this.createUnitCategoryUsecase.execute(body);
  }

  async getCurrencyById(id: string): Promise<UnitCategoryResponseDto> {
    return this.findUnitCategoryByIdUsecase.execute(id);
  }

  async findAll(
    query: FindAllDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.findAllUnitCategoriesUsecase.execute(query);
  }

  async deleteById(id: string): Promise<void> {
    return this.softDeleteUnitCategoryUsecase.execute(id);
  }

  async updateById(
    id: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.updateUnitCategoryUsecase.execute(id, body);
  }
}
