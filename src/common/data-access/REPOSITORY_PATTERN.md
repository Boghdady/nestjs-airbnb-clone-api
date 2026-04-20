# Repository Pattern - Implementation Guide

Simple guide to implement the BaseRepository pattern in NestJS with MongoDB.

## Why Use Repository Pattern?

- ✅ Write CRUD logic once, use everywhere
- ✅ Built-in pagination & transactions
- ✅ Easier testing (mock repository instead of Mongoose)
- ✅ 14 lines of code = 15+ methods per entity

---

## Implementation Steps

### Step 1: Model Names Enum

`src/shared/database/model-names.ts`

```typescript
export enum ModelName {
  USER = 'User',
  COUNTRY = 'Country',
  ORDER = 'Order',
  ADMIN = 'Admin',
  REFRESH_TOKEN = 'RefreshToken',
  // Add more as needed
}
```

### Step 2: BaseRepository

`src/shared/database/database-repository.ts`

```typescript
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

```

### Step 3: Barrel Export

`src/shared/database/index.ts`

```typescript
export * from './model-names';
export * from './database-repository';
```

### Step 4: Entity Repository

`src/users/repositories/user.repository.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { BaseRepository, ModelName } from 'src/shared/database';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(ModelName.USER)
    model: Model<HydratedDocument<User>>,
  ) {
    super(model);
  }
}
```

### Step 5: Register in Module

`src/users/users.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './schemas/user.schema';
import { ModelName } from 'src/shared/database';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.USER, schema: UserSchema }
    ]),
  ],
  providers: [
    UserRepository,
    // ... your use cases
  ],
  exports: [UserRepository],
})
export class UsersModule {}
```

---

## Usage in Use Cases

```typescript
// Create
await userRepository.create({ name: 'John', email: 'john@example.com' });

// Find
await userRepository.findById(id);
await userRepository.findOne({ email: 'john@example.com' });

// Paginated
await userRepository.findPaginated({ blocked: false }, { page: 1, limit: 20 });

// Update
await userRepository.findByIdAndUpdate(id, { $set: { name: 'Jane' } });

// Delete
await userRepository.findByIdAndDelete(id);
```
