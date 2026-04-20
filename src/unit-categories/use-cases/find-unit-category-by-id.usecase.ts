import { Injectable } from '@nestjs/common';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';

@Injectable()
export class FindUnitCategoryByIdUsecase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(id: string): Promise<UnitCategoryResponseDto> {
    const unitCategory = await this.unitCategoriesRepository.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!unitCategory) throw new NotFoundException('No unit category found');

    return plainToInstance(UnitCategoryResponseDto, unitCategory.toObject());
  }
}
