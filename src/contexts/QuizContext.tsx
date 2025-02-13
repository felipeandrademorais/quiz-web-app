import { createContext, useContext, useState } from "react";
import api from "../config/axios";
import { QuizState, QuestionsResponse } from "../interfaces/quiz";

interface QuizContextType {
    quizState: QuizState;
    setQuizState: (state: QuizState) => void;
    fetchQuestions: (
        seasonId: string,
        page: number
    ) => Promise<QuestionsResponse>;
    saveProgress: (
        seasonId: string,
        answers: Record<string, string>,
        currentQuestion: number,
        totalTime: number
    ) => Promise<void>;
    completeSeason: (seasonId: string) => Promise<void>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
    const [quizState, setQuizState] = useState<QuizState>({
        currentQuestionIndex: 0,
        answers: {},
        startTime: Date.now(),
        selectedAnswer: null,
        showExplanation: false,
        currentPage: 1,
        isLastPage: false,
    });

    const fetchQuestions = async (
        seasonId: string,
        page: number
    ): Promise<QuestionsResponse> => {
        const response = await api.get(
            `/questions?seasonId=${seasonId}&page=${page}`
        );
        return response.data;
    };

    const saveProgress = async (
        seasonId: string,
        answers: Record<string, string>,
        currentQuestion: number,
        totalTime: number
    ): Promise<void> => {
        await api.post(`/seasons/${seasonId}/save`, {
            answers,
            currentQuestion,
            totalTime,
        });
    };

    const completeSeason = async (seasonId: string): Promise<void> => {
        await api.post(`/seasons/${seasonId}/complete?id=${seasonId}`);
    };

    return (
        <QuizContext.Provider
            value={{
                quizState,
                setQuizState,
                fetchQuestions,
                saveProgress,
                completeSeason,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

export function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuiz must be used within a QuizProvider");
    }
    return context;
}
