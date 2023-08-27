import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create.dto';
import { Balance } from './entities/balance.entity';
import { AuthGuard } from '../auth/auth.guard';
import { Auth } from '../auth/auth.decorator';
import { AuthInfo } from '../auth/auth.interface';

@Controller('balances')
@UseGuards(AuthGuard)
export class BalancesController {
    constructor(private balanceService: BalancesService) {}

    @Post()
    async create(@Auth() auth: AuthInfo, @Body() createBalanceDto: CreateBalanceDto): Promise<Balance> {
        return await this.balanceService.create({
            name: createBalanceDto.name,
            balance: createBalanceDto.balance,
            user_id: auth.user.id
        })
    }
}
