export interface CreateValues {
    name: string
    email: string
    password: string
}

export interface FindByEmailOptions {
    withPassword?: boolean
}