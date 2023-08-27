import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/features/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
