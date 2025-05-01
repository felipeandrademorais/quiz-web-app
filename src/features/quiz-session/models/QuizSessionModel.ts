export interface Question {
    id: string;
    content: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: string;
    explanation?: string;
}

export interface QuestionsResponse {
    data: Question[];
    meta: {
        total: number;
        currentPage: number;
        totalPages: number;
    };
}

export interface QuizState {
    currentPage: number;
    currentQuestionIndex: number;
    selectedAnswer: string | null;
    showExplanation: boolean;
    answers: Record<string, string>;
    startTime: number;
}
