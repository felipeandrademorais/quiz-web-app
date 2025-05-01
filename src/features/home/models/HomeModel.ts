export interface Season {
    id: string;
    title: string;
    description: string;
    status: "OPEN" | "IN_PROGRESS" | "COMPLETED";
    createdAt: string;
    updatedAt: string;
}

export interface HomeState {
    message?: string;
    isLoading: boolean;
    seasons?: Season[];
    error?: string;
}
