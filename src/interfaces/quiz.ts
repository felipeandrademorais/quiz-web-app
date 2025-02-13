export interface Question {
    id: string;
    seasonId: string;
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    explanation?: string;
    points: number;
    orderIndex: number;
    createdAt: string;
    updatedAt: string;
}

export interface QuizState {
    currentQuestionIndex: number;
    answers: Record<string, string>;
    startTime: number;
    selectedAnswer: string | null;
    showExplanation: boolean;
    currentPage: number;
    isLastPage: boolean;
}

export interface QuestionsResponse {
    data: Question[];
    meta: {
        currentPage: number;
        totalPages: number;
        total: number;
        page: string;
        limit: number;
    };
}
