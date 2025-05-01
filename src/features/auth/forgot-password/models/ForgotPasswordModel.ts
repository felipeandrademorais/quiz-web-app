export interface ForgotPasswordModel {
    email: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    error?: string;
    message?: string;
}
