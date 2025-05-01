import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../config/axios";
import { Season } from "../models/HomeModel";

export function useHomeViewModel() {
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;

    const { data: seasons, isLoading } = useQuery<Season[]>({
        queryKey: ["seasons"],
        queryFn: async () => {
            const response = await api.get("/seasons");
            return response.data.data.filter(
                (season: Season) =>
                    season.status === "OPEN" || season.status === "IN_PROGRESS"
            );
        },
    });

    const handleStartQuiz = async (seasonId: string) => {
        try {
            await api.post(`/seasons/${seasonId}/start`);
            navigate(`/seasons/${seasonId}`);
        } catch (error) {
            console.error("Failed to start season:", error);
            alert("Failed to start the quiz. Please try again.");
        }
    };

    return {
        seasons,
        isLoading,
        message,
        handleStartQuiz,
    };
}
