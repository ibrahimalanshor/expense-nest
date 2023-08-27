export interface ResourceMany<T> {
    meta: {
        count: number
    },
    data: T[]
}

export interface ResourcePageQuery {
    number: number
    take: number
    skip: number
}

export interface GetResourceQuery {
    page?: Partial<ResourcePageQuery>
}