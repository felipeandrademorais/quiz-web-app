import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../config/axios";
import { User } from "../interfaces/auth";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (
        username: string,
        password: string,
        rememberMe: boolean
    ) => Promise<void>;
    logout: () => void;
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = async (
        username: string,
        password: string,
        rememberMe: boolean
    ) => {
        try {
            console.log("login", username, password, rememberMe);
            const response = await api.post("/auth/login", {
                username,
                password,
            });
            const { token, user: userData } = response.data;

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            if (rememberMe) {
                sessionStorage.removeItem("token");
                localStorage.setItem("token", token);
            } else {
                localStorage.removeItem("token");
                sessionStorage.setItem("token", token);
            }

            setUser(userData);
            setIsAuthenticated(true);
        } catch (error: any) {
            if (error.response?.data?.message) {
                const messages = Array.isArray(error.response.data.message)
                    ? error.response.data.message
                    : [error.response.data.message];
                messages.forEach((msg: string) => toast.error(msg));
            } else {
                toast.error("Login failed. Please try again.");
            }
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    const register = async (
        username: string,
        email: string,
        password: string
    ) => {
        try {
            await api.post("/auth/register", { username, email, password });
            toast.success("Account created successfully! Please login.");
        } catch (error: any) {
            if (error.response?.data?.message) {
                const messages = Array.isArray(error.response.data.message)
                    ? error.response.data.message
                    : [error.response.data.message];
                messages.forEach((msg: string) => toast.error(msg));
            } else {
                toast.error("Registration failed. Please try again.");
            }
            throw error;
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            await api.post("/auth/forgot-password", { email });
        } catch (error: any) {
            if (error.response?.data?.message) {
                const messages = Array.isArray(error.response.data.message)
                    ? error.response.data.message
                    : [error.response.data.message];
                messages.forEach((msg: string) => toast.error(msg));
            } else {
                toast.error(
                    "Password recovery request failed. Please try again."
                );
            }
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                logout,
                register,
                forgotPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
