import { useState, useEffect, useCallback } from 'react';
import { Category, QuizState, UseQuizReturn } from '../utils/types/quiz.types';

export const useQuiz = (category: Category): UseQuizReturn => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    timeRemaining: category.questions[0].timeLimit,
    isQuizComplete: false,
  });

  const resetTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      timeRemaining: category.questions[prev.currentQuestionIndex].timeLimit
    }));
  }, [category]);

  useEffect(() => {
    if (state.isQuizComplete) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 0) {
          // Move to next question when timer expires
          if (prev.currentQuestionIndex < category.questions.length - 1) {
            return {
              ...prev,
              currentQuestionIndex: prev.currentQuestionIndex + 1,
              timeRemaining: category.questions[prev.currentQuestionIndex + 1].timeLimit,
              answers: { ...prev.answers, [category.questions[prev.currentQuestionIndex].id]: null }
            };
          } else {
            // End quiz if it's the last question
            clearInterval(timer);
            return { ...prev, isQuizComplete: true };
          }
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [category, state.isQuizComplete, state.currentQuestionIndex]);

  const handleAnswer = (answer: string) => {
    if (state.isQuizComplete) return;

    const currentQuestion = category.questions[state.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: { ...prev.answers, [currentQuestion.id]: answer }
    }));
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < category.questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        timeRemaining: category.questions[prev.currentQuestionIndex + 1].timeLimit
      }));
    } else {
      setState(prev => ({ ...prev, isQuizComplete: true }));
    }
  };

  return {
    state,
    handleAnswer,
    handleNext,
    resetTimer
  };
};