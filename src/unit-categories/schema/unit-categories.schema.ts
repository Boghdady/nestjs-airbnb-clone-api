import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UnitCategories {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  icon?: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const UnitCategoriesSchema =
  SchemaFactory.createForClass(UnitCategories);
