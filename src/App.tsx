import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { AuthProvider } from "./contexts/AuthContext";
import { routes } from "./routes";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Theme appearance="light" accentColor="blue" radius="medium">
                <AuthProvider>
                    <Router>
                        <div className="min-h-screen bg-gray-50">
                            <Routes>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={route.element}
                                    />
                                ))}
                            </Routes>
                        </div>
                    </Router>
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                <ToastContainer position="top-right" autoClose={5000} />
            </Theme>
        </QueryClientProvider>
    );
}

export default App;
