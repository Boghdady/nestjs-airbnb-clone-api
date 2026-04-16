import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { plainToInstance } from 'class-transformer';
import { FindAllDto } from '../dtos/find-all.dto';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';
import { PaginatedResult } from '../../common/data-access';
import { UnitCategories } from '../schema/unit-categories.schema';

@Injectable()
export class FindAllUnitCategoriesUsecase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(
    query: FindAllDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    const matchQuery: QueryFilter<UnitCategories> = {
      isDeleted: { $ne: true },
    };
    if (query?.name) matchQuery.name = { $regex: query.name, $options: 'i' };

    const result = await this.unitCategoriesRepository.findPaginated(
      matchQuery,
      {
        page: query?.page,
        limit: query?.limit,
        ignoreLimit: query?.ignoreLimit,
        lean: true,
      },
    );

    return plainToInstance(PaginatedResult<UnitCategoryResponseDto>, result);
  }
}
