import { Injectable } from '@nestjs/common';
import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

import { UnitCategoriesRepository } from '../repository/unit-categories.repository';

@Injectable()
export class CreateUnitCategoryUsecase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(body: CreateUnitCategoryDto): Promise<UnitCategoryResponseDto> {
    const existingUnitCategory = await this.unitCategoriesRepository.findOne({
      name: body.name,
      isDeleted: { $ne: true },
    });

    if (existingUnitCategory)
      throw new BadRequestException('Unit category name already exist');

    const createdUnitCategory =
      await this.unitCategoriesRepository.create(body);
    return plainToInstance(
      UnitCategoryResponseDto,
      createdUnitCategory.toObject(),
    );
  }
}
