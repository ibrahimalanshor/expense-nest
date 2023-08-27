import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create.dto';
import { Balance } from './entities/balance.entity';
import { AuthGuard } from '../auth/auth.guard';
import { Auth } from '../auth/auth.decorator';
import { AuthInfo } from '../auth/auth.interface';
import { GetResourceDto } from 'src/common/resource/dto/get-resource.dto';
import { ResourceMany, ResourcePageQuery } from 'src/common/resource/resource.interface';
import { PageQuery } from 'src/common/resource/decorators/page-query.decorator';

@Controller('balances')
@UseGuards(AuthGuard)
export class BalancesController {
    constructor(private balanceService: BalancesService) {}

    @Post('/')
    async create(@Auth() auth: AuthInfo, @Body() createBalanceDto: CreateBalanceDto): Promise<Balance> {
        return await this.balanceService.create({
            name: createBalanceDto.name,
            balance: createBalanceDto.balance,
            user_id: auth.user.id
        })
    }

    @Get('/')
    async getAll(
        @Auth() auth: AuthInfo,
        @Query() query: GetResourceDto,
        @PageQuery() page: ResourcePageQuery
    ): Promise<ResourceMany<Balance>> {
        return await this.balanceService.getAll({
            page
        })
    }
}
