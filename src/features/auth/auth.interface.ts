export interface RegisterCredential {
    name: string
    email: string
    password: string
}

export interface AuthResult {
    accessToken: string
}