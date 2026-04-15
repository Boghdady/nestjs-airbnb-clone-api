import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class SoftDeleteCurrencyUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(id: string): Promise<void> {
    const existingCurrency = await this.currencyRepository.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });

    if (!existingCurrency)
      throw new NotFoundException('No currency found for this id');

    await this.currencyRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
  }
}
