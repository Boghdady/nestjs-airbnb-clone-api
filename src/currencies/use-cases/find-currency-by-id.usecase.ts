import { Injectable } from '@nestjs/common';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class FindCurrencyByIdUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(id: string): Promise<CurrencyResponseDto> {
    const currency = await this.currencyRepository.findOne({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!currency) throw new NotFoundException('No currency found');

    return plainToInstance(CurrencyResponseDto, currency.toObject());
  }
}
