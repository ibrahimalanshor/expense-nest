export interface RegisterCredential {
    name: string
    email: string
    password: string
}

export interface LoginCredential {
    email: string
    password: string
}

export interface AuthResult {
    accessToken: string
}