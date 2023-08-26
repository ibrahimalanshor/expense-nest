import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/features/users/users.service';
import { AuthResult, LoginCredential, RegisterCredential } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/features/users/entities/user.entity';
import { compare } from 'bcrypt'
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) {}

  async register(credential: RegisterCredential): Promise<AuthResult> {
    const user = await this.userService.create(credential)

    return await this.generateAuthResult(user)
  }

  async login(credential: LoginCredential): Promise<AuthResult> {
    try {
      const user = await this.userService.findByEmail(credential.email, {
        withPassword: true
      })

      if (!await compare(credential.password, user.password)) {
        throw new UnauthorizedException('Invalid password')
      }

      return this.generateAuthResult(user)
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new UnauthorizedException('Email not found')
      }

      throw err
    }
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
