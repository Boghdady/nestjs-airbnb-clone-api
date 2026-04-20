import { Injectable } from '@nestjs/common';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { CurrencyRepository } from '../repository/currency.repository';

@Injectable()
export class UpdateCurrencyUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    currencyId: string,
    body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    // check if the country exists
    const currency = await this.currencyRepository.findOne({
      _id: currencyId,
      isDeleted: { $ne: true },
    });

    if (!currency) throw new BadRequestException('Currency not found');

    // check if the name is already taken
    if (body?.name) {
      const existingCurrency = await this.currencyRepository.findOne({
        name: body.name,
        isDeleted: { $ne: true },
        _id: { $ne: currencyId },
      });

      if (existingCurrency)
        throw new BadRequestException('Currency name already exists');
    }

    const updatedCurrency = await this.currencyRepository.findByIdAndUpdate(
      currencyId,
      body,
      { returnDocument: 'after' },
    );

    return plainToInstance(CurrencyResponseDto, updatedCurrency?.toObject());
  }
}
