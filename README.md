# Quiz Web Application

A modern, interactive quiz application built with React, TypeScript, and Vite. This application allows users to participate in quizzes, track their progress, and review their answers with detailed explanations.

## Features

-   **User Authentication**: Secure login, registration, and password recovery
-   **Interactive Quiz Interface**: Clean and intuitive UI for taking quizzes
-   **Progress Tracking**: Save and resume quiz progress
-   **Real-time Feedback**: Immediate feedback on answers with explanations
-   **Pagination**: Support for multi-page quizzes
-   **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

-   **Frontend Framework**: React 19.0.0
-   **Language**: TypeScript 5.7.2
-   **Build Tool**: Vite 6.1.0
-   **Styling**: Tailwind CSS 4.0.6
-   **State Management**: React Query 5.66.0
-   **Form Handling**: React Hook Form 7.54.2
-   **Routing**: React Router DOM 7.1.5
-   **HTTP Client**: Axios 1.7.9
-   **Validation**: Zod 3.24.2

## Prerequisites

-   Node.js (LTS version recommended)
-   npm or yarn package manager

## Getting Started

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd quiz-web-app
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:

    ```bash
    cp .env.example .env
    ```

    Update the `VITE_API_URL` in the `.env` file with your API server URL.

4. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

-   `npm run dev` - Start the development server
-   `npm run build` - Build the application for production
-   `npm run lint` - Run ESLint to check code quality
-   `npm run preview` - Preview the production build locally

## Project Structure

```
├── src/
│   ├── assets/        # Static assets
│   ├── config/        # Configuration files
│   ├── contexts/      # React context providers
│   ├── interfaces/    # TypeScript interfaces
│   ├── pages/         # Page components
│   ├── routes/        # Route definitions
│   ├── App.tsx        # Root component
│   └── main.tsx       # Entry point
├── public/            # Public assets
├── .env.example      # Environment variables template
└── vite.config.ts    # Vite configuration
```

## Key Features Explained

### Authentication

-   Implements JWT-based authentication
-   Supports both local and session storage for tokens
-   Includes password recovery functionality

### Quiz System

-   Dynamic question loading with pagination
-   Progress saving and resumption
-   Immediate feedback with explanations
-   Season-based quiz organization

### UI/UX

-   Modern and responsive design using Tailwind CSS
-   Loading states and error handling
-   Intuitive navigation between questions
-   Progress indicators and completion tracking

## Contributing

1. Fork the repository
2. Create a new branch for your feature:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add some feature"
    ```
4. Push to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Create a Pull Request

### Contribution Guidelines

-   Follow the existing code style and conventions
-   Write clear commit messages
-   Include tests for new features when applicable
-   Update documentation as needed
-   Ensure all tests pass before submitting PR

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please file an issue in the GitHub repository.
