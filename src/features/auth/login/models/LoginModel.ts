export interface LoginModel {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface LoginResponse {
    success: boolean;
    error?: string;
}
