import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class CreateCurrencyUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    const existingCurrency = await this.currencyRepository.findOne({
      name: body.name,
      isDeleted: { $ne: true },
    });

    if (existingCurrency)
      throw new BadRequestException('Currency name already exist');

    const createdCurrency = await this.currencyRepository.create(body);
    return plainToInstance(CurrencyResponseDto, createdCurrency.toObject());
  }
}
