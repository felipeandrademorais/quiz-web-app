import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import api from "../config/axios";

interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    login: (
        username: string,
        password: string,
        rememberMe: boolean
    ) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string) => Promise<void>;
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
            // Fetch user data if needed
        }
        setIsLoading(false);
    }, []);

    const login = async (
        username: string,
        password: string,
        rememberMe: boolean
    ) => {
        try {
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
        } catch (error) {
            throw new Error("Login failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    const register = async (email: string, password: string) => {
        try {
            await api.post("/auth/register", { email, password });
        } catch (error) {
            throw new Error("Registration failed");
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            await api.post("/auth/forgot-password", { email });
        } catch (error) {
            throw new Error("Password recovery request failed");
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
