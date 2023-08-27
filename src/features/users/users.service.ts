import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateValues, FindByEmailOptions } from './users.interface';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {} 

    async create(values: CreateValues): Promise<User> {
        try {
            const user = this.userRepository.create({
                email: values.email,
                name: values.name,
                password: values.password
            })
    
            await this.userRepository.save(user)
    
            return user
        } catch (err) {
            if (err instanceof QueryFailedError && err.driverError.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User already exists')
            }
            
            throw err
        }
    }

    async findByEmail(email: string, options?: FindByEmailOptions): Promise<User> {
        return await this.userRepository.findOneOrFail({
            select: {
                id: true,
                password: options?.withPassword ?? false
            },
            where: { email }
        })
    }
    
    async findById(id: number): Promise<User> {
        return await this.userRepository.findOneByOrFail({ id })
    }
}
