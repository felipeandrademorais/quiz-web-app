import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useQuiz } from "../../../contexts/QuizContext";
import { Question, QuestionsResponse } from "../models/QuizSessionModel";

export function useQuizSessionViewModel() {
    const { seasonId } = useParams();
    const navigate = useNavigate();
    const {
        quizState,
        setQuizState,
        fetchQuestions,
        saveProgress,
        completeSeason,
    } = useQuiz();

    const {
        data: questionsResponse,
        isLoading,
        refetch,
    } = useQuery<QuestionsResponse>({
        queryKey: ["questions", seasonId, quizState.currentPage],
        queryFn: async () => {
            if (!seasonId) return null;
            return await fetchQuestions(seasonId, quizState.currentPage);
        },
    });

    const questions = questionsResponse?.data;
    const currentQuestion = questions?.[quizState.currentQuestionIndex];

    const handleAnswerSelect = (option: string) => {
        if (quizState.selectedAnswer !== null) return;

        setQuizState({
            ...quizState,
            selectedAnswer: option,
            showExplanation: option !== currentQuestion?.answer,
        });
    };

    const handleNextQuestion = async () => {
        if (!questions || !seasonId) return;

        const newAnswers = {
            ...quizState.answers,
            [currentQuestion?.id]: quizState.selectedAnswer,
        };

        const totalAnswered = Object.keys(newAnswers).length;
        const isLastQuestion = totalAnswered === questionsResponse?.meta.total;

        if (isLastQuestion) {
            await handleSeasonComplete();
            return;
        }

        const isLastQuestionInPage =
            quizState.currentQuestionIndex === questions.length - 1;

        if (
            isLastQuestionInPage &&
            questionsResponse?.meta.currentPage <
                questionsResponse?.meta.totalPages
        ) {
            setQuizState({
                ...quizState,
                currentPage: quizState.currentPage + 1,
                currentQuestionIndex: 0,
                answers: newAnswers,
                selectedAnswer: null,
                showExplanation: false,
            });
            await refetch();
        } else if (!isLastQuestionInPage) {
            setQuizState({
                ...quizState,
                currentQuestionIndex: quizState.currentQuestionIndex + 1,
                answers: newAnswers,
                selectedAnswer: null,
                showExplanation: false,
            });
        }
    };

    const handlePreviousQuestion = () => {
        setQuizState({
            ...quizState,
            currentQuestionIndex: quizState.currentQuestionIndex - 1,
            selectedAnswer: quizState.answers[currentQuestion?.id] ?? null,
            showExplanation: false,
        });
    };

    const handleSeasonComplete = async () => {
        if (!seasonId) return;
        try {
            await completeSeason(seasonId);
            navigate("/", {
                state: { message: "Quiz completed successfully!" },
            });
        } catch (error) {
            console.error("Failed to complete season:", error);
            alert("Failed to complete season. Please try again.");
        }
    };

    const handleSaveAndExit = async () => {
        if (!seasonId) return;
        try {
            await saveProgress(
                seasonId,
                quizState.answers,
                quizState.currentQuestionIndex,
                Date.now() - quizState.startTime
            );
            navigate("/");
        } catch (error) {
            console.error("Failed to save progress:", error);
        }
    };

    return {
        questionsResponse,
        questions,
        currentQuestion,
        quizState,
        isLoading,
        handleAnswerSelect,
        handleNextQuestion,
        handlePreviousQuestion,
        handleSaveAndExit,
    };
}
