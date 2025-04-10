// Base types
export type Option = string;

export interface Question {
  id: string;
  question: string;
  options: Option[];
  correctAnswer: string;
  timeLimit: number;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

// Main type
export type QuizData = {
  categories: Category[];
}; 
  
  
export interface QuizState {
    currentQuestionIndex: number;
    score: number;
    answers: Record<string, string | null>;
    timeRemaining: number;
    isQuizComplete: boolean;
}


export interface QuizActions {
  handleAnswer: (answer: string) => void;
  handleNext: () => void;
  resetTimer: () => void;
}

export interface UseQuizReturn extends QuizActions {
  state: QuizState;
} 