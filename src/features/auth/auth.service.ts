import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/features/users/users.service';
import { AuthResult, RegisterCredential } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/features/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async register(credential: RegisterCredential): Promise<AuthResult> {
    const user = await this.userService.create(credential)

    return await this.generateAuthResult(user)
  }

  async generateAuthResult(user: User): Promise<AuthResult> {
    const accessToken = await this.jwtService.signAsync({
      user_id: user.id
    })

    return {
      accessToken
    } 
  }
}
