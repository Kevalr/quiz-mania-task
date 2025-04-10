import React from 'react';
// import { Timer } from 'lucide-react';
import { Question } from '../utils/types/quiz.types';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  timeRemaining: number;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  timeRemaining,
  onAnswer,
  onNext,
  isLastQuestion,
}) => {
  const getOptionStyle = (option: string) => {
    if (!selectedAnswer) return 'bg-white hover:bg-gray-50';
    const optionLetter = option.charAt(0);
    if (selectedAnswer === question.correctAnswer && optionLetter === selectedAnswer) {
      return 'bg-green-100 border-green-500';
    }
    if (selectedAnswer === optionLetter && optionLetter !== question.correctAnswer) {
      return 'bg-red-100 border-red-500';
    }
    return 'bg-white opacity-50';
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {/* <Timer className="w-5 h-5 text-gray-500 mr-2" /> */}
          <span className="text-lg font-semibold text-gray-700">
            {timeRemaining} seconds
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !selectedAnswer && onAnswer(option.charAt(0))}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${getOptionStyle(
              option
            )}`}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <button
          onClick={onNext}
          className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default QuizQuestion;