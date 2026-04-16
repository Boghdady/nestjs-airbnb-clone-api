import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UnitCategoryIdDto {
  @IsNotEmpty()
  @IsMongoId({ message: 'Param must be a valid mongo id' })
  id: string;
}
