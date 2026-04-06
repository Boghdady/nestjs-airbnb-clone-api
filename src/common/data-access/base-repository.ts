import {
  AggregateOptions,
  HydratedDocument,
  Model,
  PipelineStage,
  QueryOptions,
  UpdateQuery,
  ClientSession,
} from 'mongoose';

export interface CreateOptions {
  session?: ClientSession;
}

export interface FindPaginatedOptions extends QueryOptions {
  page?: number;
  limit?: number;
  ignoreLimit?: boolean;
}

export interface PaginatedAggregationOptions {
  page: number;
  limit?: number;
  ignoreLimit?: boolean;
  session?: ClientSession;
}

export interface UpdateManyOptions {
  session?: ClientSession;
}

export interface FindByIdAndDeleteOptions {
  session?: ClientSession;
}

export interface DeleteManyOptions {
  session?: ClientSession;
}

export interface FindOneOptions {
  session?: ClientSession;
}

export interface FindOneAndDeleteOptions {
  session?: ClientSession;
}

export class PaginatedResult<T> {
  data: Array<T>;
  totalCount: number;
  page: number | undefined;
  limit: number | undefined;
  pageCount: number;

  constructor(
    data: Array<T>,
    totalCount: number,
    page?: number,
    limit?: number,
  ) {
    this.data = data;
    this.totalCount = totalCount;
    this.page = page;
    this.limit = limit;
    this.pageCount = Math.ceil(totalCount / (limit || 0)) || 0;
  }
}

export class BaseRepository<T> {
  constructor(public readonly model: Model<T>) {}

  async create(
    body: Partial<T>,
    options?: CreateOptions,
  ): Promise<HydratedDocument<T>> {
    const document = new this.model(body);

    await document.save({
      session: options?.session,
    });

    return document;
  }

  async findById(id: string | number, options: QueryOptions = {}) {
    const document = await this.model.findById(id, undefined, options);

    return document;
  }

  async find(
    filterQuery?: Record<string, unknown>,
    options: QueryOptions = {},
  ) {
    const documents = await this.model.find(filterQuery, undefined, options);

    return documents;
  }

  async findOne(
    filterQuery?: Record<string, unknown>,
    options?: FindOneOptions,
  ) {
    const document = await this.model.findOne(filterQuery, undefined, {
      session: options?.session,
    });

    return document;
  }

  async findByIdAndUpdate(
    id: string | number,
    updateQuery: UpdateQuery<HydratedDocument<T>>,
    options: QueryOptions = {},
  ) {
    const document = await this.model.findByIdAndUpdate(id, updateQuery, {
      new: true,
      ...options,
    });

    return document;
  }

  async findOneAndUpdate(
    filterQuery: Record<string, unknown>,
    updateQuery: UpdateQuery<HydratedDocument<T>>,
    options: QueryOptions = {},
  ) {
    const document = await this.model.findOneAndUpdate(
      filterQuery,
      updateQuery,
      {
        returnDocument: 'after',
        ...options,
      },
    );

    return document;
  }

  async findByIdAndDelete(
    id: string | number,
    options?: FindByIdAndDeleteOptions,
  ) {
    const document = await this.model.findByIdAndDelete(id, {
      session: options?.session,
    });

    return document;
  }

  async aggregate<Response = any>(
    pipeline: PipelineStage[],
    options: AggregateOptions = {},
  ) {
    const result = await this.model.aggregate<Response>(pipeline, options);

    return result;
  }

  async count(filterQuery?: Record<string, unknown>) {
    const count = await this.model.countDocuments(filterQuery);

    return count;
  }

  async findPaginated(
    filterQuery?: Record<string, unknown>,
    options?: FindPaginatedOptions,
  ): Promise<PaginatedResult<T>> {
    options = options || {};
    options.page = options.page || 1;
    options.limit = options.limit || 10;

    if (options.ignoreLimit && options.limit) {
      delete options.limit;
    }

    const skip =
      options?.limit && options?.page ? (options.page - 1) * options.limit : 0;

    const data = await this.model.find(filterQuery, undefined, {
      ...options,
      skip,
    });

    const totalCount = await this.model.countDocuments(filterQuery);

    const response = new PaginatedResult<T>(
      data,
      totalCount,
      options?.page,
      options?.limit,
    );

    return response;
  }

  async findOneAndDelete(
    filterQuery?: Record<string, unknown>,
    options?: FindOneAndDeleteOptions,
  ) {
    const document = await this.model.findOneAndDelete(filterQuery, {
      session: options?.session,
    });

    return document;
  }

  async updateMany(
    filterQuery: Record<string, unknown>,
    updateQuery: UpdateQuery<HydratedDocument<T>>,
    options?: UpdateManyOptions,
  ) {
    const result = await this.model.updateMany(filterQuery, updateQuery, {
      session: options?.session,
      runValidators: true,
    });

    return result;
  }

  async deleteMany(
    filterQuery: Record<string, unknown>,
    options?: DeleteManyOptions,
  ): Promise<{ deletedCount: number }> {
    const result = await this.model.deleteMany(filterQuery, {
      session: options?.session,
    });

    return result;
  }

  async paginatedAggregation<Response = any>(
    pipeline: PipelineStage[],
    options?: PaginatedAggregationOptions,
  ): Promise<PaginatedResult<Response>> {
    if (options?.ignoreLimit && options?.limit) {
      const optionsWithoutLimit = { ...options };
      delete optionsWithoutLimit.limit;
      options = optionsWithoutLimit;
    }

    const skip = options?.ignoreLimit
      ? undefined
      : options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;

    const limit = options?.ignoreLimit ? undefined : options?.limit;

    const paginatedPipeline = [
      ...pipeline,
      ...(skip ? [{ $skip: skip }] : []),
      ...(limit ? [{ $limit: limit }] : []),
    ];

    const counterPipeline = [
      ...pipeline,
      { $group: { _id: null, count: { $sum: 1 } } },
    ];

    const [documents, counter] = await Promise.all([
      this.aggregate<Response>(paginatedPipeline, {
        session: options?.session,
      }),
      this.aggregate<{ _id: null; count: number }>(counterPipeline, {
        session: options?.session,
      }),
    ]);

    const totalCount = counter[0] ? counter[0].count : 0;

    const response = new PaginatedResult<Response>(
      documents,
      totalCount,
      options?.page,
      options?.limit,
    );

    return response;
  }
}
