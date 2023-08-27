import { GetResourceQuery } from "src/common/resource/resource.interface"

export interface CreateValues {
    name: string
    balance?: number
    user_id: number
}

export interface GetAllQuery extends GetResourceQuery {}