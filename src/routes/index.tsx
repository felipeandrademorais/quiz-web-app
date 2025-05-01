import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LoginView } from "../features/auth/login";
import { RegisterView } from "../features/auth/register";
import { ForgotPasswordView } from "../features/auth/forgot-password";
import { HomeView } from "../features/home";
import { QuizSessionView } from "../features/quiz-session";

function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
}

export const routes = [
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginView />
            </PublicRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <PublicRoute>
                <RegisterView />
            </PublicRoute>
        ),
    },
    {
        path: "/forgot-password",
        element: (
            <PublicRoute>
                <ForgotPasswordView />
            </PublicRoute>
        ),
    },
    {
        path: "/",
        element: (
            <PrivateRoute>
                <HomeView />
            </PrivateRoute>
        ),
    },
    {
        path: "/seasons/:seasonId",
        element: (
            <PrivateRoute>
                <QuizSessionView />
            </PrivateRoute>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
];
