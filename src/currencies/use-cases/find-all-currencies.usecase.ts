import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { plainToInstance } from 'class-transformer';
import { FindAllDto } from '../dtos/find-all.dto';
import { CurrencyRepository } from '../repository/currency.repository';
import { PaginatedResult } from '../../common/data-access';
import { Currency } from '../schema/currency.schema';

@Injectable()
export class FindAllCurrenciesUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    query: FindAllDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    const matchQuery: QueryFilter<Currency> = { isDeleted: { $ne: true } };
    if (query?.name) matchQuery.name = { $regex: query.name, $options: 'i' };
    if (query?.currencyCode) matchQuery.currencyCode = query.currencyCode;

    const result = await this.currencyRepository.findPaginated(matchQuery, {
      page: query?.page,
      limit: query?.limit,
      ignoreLimit: query?.ignoreLimit,
      lean: true,
    });

    return plainToInstance(PaginatedResult<CurrencyResponseDto>, result);
  }
}
