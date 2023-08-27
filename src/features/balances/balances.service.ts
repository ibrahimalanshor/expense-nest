import { Injectable } from '@nestjs/common';
import { CreateValues } from './balances.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalancesService {
    constructor(@InjectRepository(Balance) private balanceRepository: Repository<Balance>) {}

    async create(values: CreateValues): Promise<Balance> {
        const balance = this.balanceRepository.create({
            name: values.name,
            balance: values.balance ?? 0,
            user_id: values.user_id
        })

        await this.balanceRepository.save(balance)

        return balance
    }
}
