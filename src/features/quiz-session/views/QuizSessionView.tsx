import { useQuizSessionViewModel } from "../view-models/useQuizSessionViewModel";

export default function QuizSessionView() {
    const {
        questionsResponse,
        questions,
        currentQuestion,
        quizState,
        isLoading,
        handleAnswerSelect,
        handleNextQuestion,
        handlePreviousQuestion,
        handleSaveAndExit,
    } = useQuizSessionViewModel();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">
                    No questions available
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm text-gray-600">
                            Question {quizState.currentQuestionIndex + 1} of{" "}
                            {questions?.length} (Page{" "}
                            {questionsResponse?.meta.currentPage} of{" "}
                            {questionsResponse?.meta.totalPages})
                        </div>
                        <button
                            onClick={handleSaveAndExit}
                            className="btn-secondary"
                        >
                            Save & Exit
                        </button>
                    </div>

                    <h2 className="text-xl font-semibold mb-6">
                        {currentQuestion.content}
                    </h2>

                    <div className="space-y-4">
                        {[
                            currentQuestion.optionA,
                            currentQuestion.optionB,
                            currentQuestion.optionC,
                            currentQuestion.optionD,
                        ].map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={quizState.selectedAnswer !== null}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                    quizState.selectedAnswer === null
                                        ? "hover:bg-blue-50 border-gray-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                        : quizState.selectedAnswer === option
                                        ? option === currentQuestion.answer
                                            ? "bg-green-100 border-green-500 shadow-md"
                                            : "bg-red-100 border-red-500 shadow-md"
                                        : option === currentQuestion.answer
                                        ? "bg-green-100 border-green-500 shadow-md"
                                        : "border-gray-300 shadow-sm"
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {quizState.showExplanation &&
                        currentQuestion.explanation && (
                            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <h3 className="font-semibold text-yellow-800 mb-2">
                                    Explanation
                                </h3>
                                <p className="text-yellow-700">
                                    {currentQuestion.explanation}
                                </p>
                            </div>
                        )}

                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={quizState.currentQuestionIndex === 0}
                            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextQuestion}
                            disabled={quizState.selectedAnswer === null}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {Object.keys(quizState.answers).length + 1 ===
                            questionsResponse?.meta.total
                                ? "Finish"
                                : "Next"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
