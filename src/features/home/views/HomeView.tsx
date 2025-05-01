import { useHomeViewModel } from "../view-models/useHomeViewModel";

export default function HomeView() {
    const { seasons, isLoading, message, handleStartQuiz } = useHomeViewModel();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {message && (
                    <div className="mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                        {message}
                    </div>
                )}

                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Available Quizzes
                </h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {seasons?.map((season) => (
                        <div
                            key={season.id}
                            className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
                        >
                            <div className="px-6 py-5">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {season.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    {season.description}
                                </p>
                                <div className="mt-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            season.status === "IN_PROGRESS"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-green-100 text-green-800"
                                        }`}
                                    >
                                        {season.status === "IN_PROGRESS"
                                            ? "In Progress"
                                            : "Open"}
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50">
                                <button
                                    onClick={() => handleStartQuiz(season.id)}
                                    className="w-full btn-primary"
                                >
                                    {season.status === "IN_PROGRESS"
                                        ? "Continue Quiz"
                                        : "Start Quiz"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {seasons?.length === 0 && (
                    <div className="text-center text-gray-600 mt-8">
                        No quizzes available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}
