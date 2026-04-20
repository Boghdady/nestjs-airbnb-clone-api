import { Module } from '@nestjs/common';
import { UnitCategoriesController } from './unit-categories.controller';
import { UnitCategoriesService } from './unit-categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UnitCategoriesSchema } from './schema/unit-categories.schema';
import { CreateUnitCategoryUsecase } from './use-cases/create-unit-category.usecase';
import { FindUnitCategoryByIdUsecase } from './use-cases/find-unit-category-by-id.usecase';
import { FindAllUnitCategoriesUsecase } from './use-cases/find-all-unit-categories.usecase';
import { SoftDeleteUnitCategoryUsecase } from './use-cases/soft-delete-unit-category.usecase';
import { UpdateUnitCategoryUsecase } from './use-cases/update-unit-category.usecase';
import { ModelNames } from '../common/data-access';
import { UnitCategoriesRepository } from './repository/unit-categories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.UNIT_CATEGORIES, schema: UnitCategoriesSchema },
    ]),
  ],
  controllers: [UnitCategoriesController],
  providers: [
    UnitCategoriesService,
    CreateUnitCategoryUsecase,
    FindUnitCategoryByIdUsecase,
    FindAllUnitCategoriesUsecase,
    SoftDeleteUnitCategoryUsecase,
    UpdateUnitCategoryUsecase,
    UnitCategoriesRepository,
  ],
  exports: [UnitCategoriesService],
})
export class UnitCategoriesModule {}
