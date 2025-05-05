import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { SecurityConfig } from 'src/types/types';

const jwt_module = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (config_service: ConfigService) => ({
    secret: config_service.get<SecurityConfig>('security').jwt_secret,
    signOptions: { expiresIn: '60m' },
  }),
  inject: [ConfigService],
});

@Module({
  imports: [jwt_module, ConfigModule],
  exports: [jwt_module],
})
export class AuthModule {}
