import { Injectable, Logger } from '@nestjs/common';
import { SystemAdminRepository } from '../repositories/system-admin.repository';
import { ConfigService } from '@nestjs/config';
import {
  EnvironmentInterface,
  ISystemAdmin,
} from '../../common/configuration/environment.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class InitializeSystemAdminUsecase {
  private logger = new Logger(InitializeSystemAdminUsecase.name);

  constructor(
    private readonly systemAdminRepository: SystemAdminRepository,
    private readonly configService: ConfigService<EnvironmentInterface>,
  ) {}

  async execute(): Promise<void> {
    const { name, email, password } =
      this.configService.getOrThrow<ISystemAdmin>('systemAdmin');

    // check if system admin already init
    const systemAdmin = await this.systemAdminRepository.findOne({ email });
    if (systemAdmin) {
      this.logger.log('System admin already initialized');
      return;
    }
    // if not, create one
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.systemAdminRepository.create({
      name,
      email,
      password: hashedPassword,
      isSuperAdmin: true,
    });
    this.logger.log('System admin initialized');
  }
}
