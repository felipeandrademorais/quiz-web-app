export interface RegisterModel {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    success: boolean;
    error?: string;
}
