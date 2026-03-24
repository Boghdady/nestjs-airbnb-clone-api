import { Exclude, Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  _id: string;

  @Expose()
  @Transform(({ value }) => value.toUpperCase())
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Exclude()
  password: string;

  @Exclude()
  __v: number;
}
