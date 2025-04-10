import React from "react";

interface QuizRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizRulesModal: React.FC<QuizRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-30 p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg">
        <div className="flex justify-between items-center p-6 pb-2">
          <h2 className="text-2xl font-bold text-gray-800">Quiz rules</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-6 pt-2 items-start">
          <div className="mb-6 rounded-md">
            <h3 className="font-extrabold mb-3 bg-[#f3f3e9] p-3 text-left rounded-md">
              10-Second Timer
            </h3>
            <ul className="space-y-3 px-2">
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span>Each question comes with a 10-second timer.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span>
                  If you don't answer within the time limit, the app will
                  automatically move to the next question.
                </span>
              </li>
            </ul>
          </div>

          <div className="mb-6 rounded-md">
            <h3 className="font-extrabold mb-3 bg-[#f3f3e9] p-3 text-left rounded-md">
              Manual Navigation
            </h3>
            <ul className="space-y-3 px-2">
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span>
                  You can navigate to the next question manually before the
                  timer expires.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span>
                  Use the "Next" button to move ahead if you're ready before the
                  timer runs out.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-md">
            <h3 className="font-extrabold mb-3 bg-[#f3f3e9] p-3 text-left rounded-md">
              Final Score and Performance Message
            </h3>
            <ul className="space-y-3 px-2">
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span>
                  After all questions are answered, your final score will be
                  displayed.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <div>
                  <p>
                    Based on your performance, you will receive a personalized
                    message:
                  </p>
                  <ul className="mt-3 ml-4 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Great job!: If you score{" "}
                        <span className="font-bold">above 80%</span>.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Well done!: If you score{" "}
                        <span className="font-bold">between 60% and 80%</span>.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Keep practicing!: If you score{" "}
                        <span className="font-bold">below 60%</span>.
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizRulesModal;