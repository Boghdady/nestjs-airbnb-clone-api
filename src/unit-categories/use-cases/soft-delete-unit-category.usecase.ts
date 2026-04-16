import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';

@Injectable()
export class SoftDeleteUnitCategoryUsecase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingUnitCategories = await this.unitCategoriesRepository.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });

    if (!existingUnitCategories)
      throw new NotFoundException('No unit categories found for this id');

    await this.unitCategoriesRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
