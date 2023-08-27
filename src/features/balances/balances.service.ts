import { Injectable } from '@nestjs/common';
import { CreateValues, GetAllQuery } from './balances.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from './entities/balance.entity';
import { Repository } from 'typeorm';
import { ResourceMany } from 'src/common/resource/resource.interface';

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

    async getAll(query?: GetAllQuery): Promise<ResourceMany<Balance>> {
        const [data, count] = await this.balanceRepository.findAndCount({
            skip: query.page.skip,
            take: query.page.take
        })

        return {
            meta: {
                count
            },
            data
        } 
    }
}
