import React, { useEffect } from "react";
import { Category } from "../utils/types/quiz.types";
import { useQuiz } from "../hooks/useQuiz";

interface QuizProps {
  category: Category;
  onQuizComplete: (score: {correct: number, wrong:number}, totalQuestions: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ category, onQuizComplete }) => {
  const { state, handleAnswer, handleNext } = useQuiz(category);
  const { currentQuestionIndex, timeRemaining, answers, isQuizComplete } = state;

  // Calculate progress percentage
  const progressPercentage =
    ((currentQuestionIndex + 1) / category.questions.length) * 100;

  // When quiz is complete, calculate score and call onQuizComplete
  useEffect(() => {
    if (isQuizComplete) {
      // Calculate score by comparing answers with correct answers
      let score = {
        correct: 0,
        wrong: 0
      };
      category.questions.forEach((question) => {
        if (answers[question.id] === question.correctAnswer) {
          score.correct++;
        } else if(Boolean(answers[question.id]) && (answers[question.id] !== question.correctAnswer)){
          score.wrong++;
        }
      });
      
      // Pass results to parent component
      onQuizComplete(score, category.questions.length);
    }
  }, [isQuizComplete, answers, category.questions, onQuizComplete]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (index: number) => {
    const optionLetter = String.fromCharCode(65 + index); // Convert index to letter (A, B, C, D)
    handleAnswer(optionLetter);
  };

  const handleSkipQuestion = () => {
    handleNext();
  };

  // Get current question
  const currentQuestion = category.questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 mt-10 bg-gray-50 rounded-lg shadow-sm">
      {/* Top progress bar and counter */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-rose-600 font-semibold">
            {currentQuestionIndex + 1}/{category.questions.length}
          </div>
          <div className="bg-gray-200 px-4 py-1 rounded-full">
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-500 transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-6">
          {currentQuestionIndex + 1}. {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index);
            const isSelected = selectedAnswer === optionLetter;

            return (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-colors
                  ${
                    isSelected
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex-shrink-0 mt-1
                    ${isSelected ? "border-rose-500" : "border-gray-400"}`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 bg-rose-500 rounded-full m-auto mt-1"></div>
                    )}
                  </div>
                  <span className="text-gray-700">{option}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex justify-between mt-8">
        <button
          className={`px-8 py-3 rounded-md transition-colors
            ${
              selectedAnswer
                ? "bg-rose-500 text-white hover:bg-rose-600 cursor-pointer"
                : "bg-rose-300 text-white cursor-not-allowed opacity-70"
            }`}
          onClick={handleNext}
          disabled={!selectedAnswer}
        >
          {currentQuestionIndex === category.questions.length - 1
            ? "Finish"
            : "Next"}
        </button>
        <button
          className={`px-4 py-3 transition-colors
                        ${
                          selectedAnswer
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-500 hover:text-gray-700 cursor-pointer"
                        }`}
          onClick={handleSkipQuestion}
          disabled={!!selectedAnswer}
        >
          Skip this question
        </button>
      </div>
    </div>
  );
};

export default Quiz;