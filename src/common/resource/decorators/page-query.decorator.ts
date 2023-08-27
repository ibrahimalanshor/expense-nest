import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { ResourcePageQuery } from "../resource.interface";

export const PageQuery = createParamDecorator((data: any, ctx: ExecutionContext): ResourcePageQuery => {
    const request: Request<{}, {}, {}, { page: { number?: number, size?: number } }> = ctx.switchToHttp().getRequest()

    const pageQuery = request.query

    if (!pageQuery.page && typeof pageQuery.page !== 'object') {
        return {
            number: 1,
            take: 10,
            skip: 0
        }
    }

    const pageNumber = pageQuery.page.number ?? 1
    const pageSize = pageQuery.page.size ?? 10

    return {
        number: pageNumber,
        take: pageSize,
        skip: (pageNumber - 1) * pageSize
    }
})