import { Injectable } from '@nestjs/common';
import { BaseRepository, ModelNames } from '../../common/data-access';
import { UnitCategories } from '../schema/unit-categories.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Injectable()
export class UnitCategoriesRepository extends BaseRepository<UnitCategories> {
  constructor(
    @InjectModel(ModelNames.UNIT_CATEGORIES)
    private readonly unitCategoriesModel: Model<
      HydratedDocument<UnitCategories>
    >,
  ) {
    super(unitCategoriesModel);
  }
}
