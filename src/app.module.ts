import { Module } from '@nestjs/common';
import { CoreModule } from './core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule, CountriesModule],
})
export class AppModule {}
