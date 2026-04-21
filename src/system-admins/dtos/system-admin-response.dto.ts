import { ApiProperty } from '@nestjs/swagger';

export class SystemAdminResponseDto {
  @ApiProperty({ description: 'System admin ID', example: '60d21b4967d0d8992e610c85' })
  _id: string;

  @ApiProperty({ description: 'System admin name', example: 'Super Admin' })
  name: string;

  @ApiProperty({ description: 'System admin email', example: 'admin@example.com' })
  email: string;

  @ApiProperty({ description: 'System admin password (hashed)', example: '$2b$10$...' })
  password: string;

  @ApiProperty({ description: 'Whether this admin has super admin privileges', example: true })
  isSuperAdmin: boolean;
}
