import { Injectable } from '@nestjs/common';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { UnitCategoriesRepository } from '../repository/unit-categories.repository';

@Injectable()
export class UpdateUnitCategoryUsecase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(
    unitCategoryId: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    // check if the unit category exists
    const unitCategory = await this.unitCategoriesRepository.findOne({
      _id: unitCategoryId,
      isDeleted: { $ne: true },
    });

    if (!unitCategory) throw new BadRequestException('Currency not found');

    // check if the name is already taken
    if (body?.name) {
      const existingUnitCategory = await this.unitCategoriesRepository.findOne({
        name: body.name,
        isDeleted: { $ne: true },
        _id: { $ne: unitCategoryId },
      });

      if (existingUnitCategory)
        throw new BadRequestException('Unit category name already exists');
    }

    const updatedUnitCategory =
      await this.unitCategoriesRepository.findByIdAndUpdate(
        unitCategoryId,
        body,
        {
          returnDocument: 'after',
        },
      );

    return plainToInstance(
      UnitCategoryResponseDto,
      updatedUnitCategory?.toObject(),
    );
  }
}
