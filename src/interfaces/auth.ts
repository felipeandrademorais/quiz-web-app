export interface User {
    id: string;
    username: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (
        username: string,
        password: string,
        rememberMe: boolean
    ) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
}
