import React from "react";

type ScoreCardProps = {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  notAnswered: number;
  onRetakeQuiz: () => void;
};

const QuizResult: React.FC<ScoreCardProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  notAnswered,
  onRetakeQuiz,
}) => {
  // Determine colors and message based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getCircleColor = (score: number) => {
    if (score >= 50) return "bg-green-100";
    return "bg-red-100";
  };

  const getIconColor = (score: number) => {
    if (score >= 50) return "text-green-500";
    return "text-red-500";
  };

  const getMessage = (score: number) => {
    if (score >= 50) return "Great job!";
    return "Keep practicing!";
  };

  const getHeadingText = (score: number) => {
    if (score >= 50) return "C O N G R A T U L A T I O N";
    return "K E E P   T R Y I N G";
  };

  return (
    <div className="bg-gray-50 mt-10 max-w-md mx-auto p-8 flex flex-col items-center text-center">
      <div className={`rounded-full p-3 mb-4 ${getCircleColor(score)}`}>
        {score >= 50 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${getIconColor(score)}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${getIconColor(score)}`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15h8" />
            <circle cx="9" cy="9" r="1" />
            <circle cx="15" cy="9" r="1" />
          </svg>
        )}
      </div>

      <div
        className={`tracking-widest ${getScoreColor(
          score
        )} text-xl font-medium mb-2`}
      >
        {getHeadingText(score)}
      </div>

      <p className="text-gray-600 text-sm mb-6">
        You successfully completed the Quiz and holds
      </p>

      <div className="mb-1">Your Score</div>

      <div className={`text-5xl font-bold ${getScoreColor(score)} mb-1`}>
        {score}%
      </div>

      <div className="text-gray-700 font-medium mb-6">{getMessage(score)}</div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 w-full mb-6">
        <div className="text-gray-600 text-sm mb-2">
          Out of {totalQuestions} question
        </div>
        <div className="flex justify-center space-x-6 text-sm">
          <div>
            <span className="text-green-500 font-medium">{correctAnswers}</span>{" "}
            Correct
          </div>
          <div>
            <span className="text-red-700 font-medium">{incorrectAnswers}</span>{" "}
            Incorrect
          </div>
          <div>
            <span className="text-gray-700 font-medium">{notAnswered}</span> Not
            answered
          </div>
        </div>
      </div>

      <button
        onClick={onRetakeQuiz}
        className="border border-red-300 text-red-400 px-8 py-2 rounded-md hover:bg-red-50 transition-colors"
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default QuizResult;