import ExitQuizButton from "./ExitQuizButton";
import ProfileHeader from "./ProfileButton";
import { useState } from "react";
function QuizHeader({
  isShowExitButton,
  isShowProfile,
  userName
}: {
  isShowExitButton: boolean
  isShowProfile: boolean
  userName: string
}) {
  return (
    <header className="bg-gray-50 border-b-2 border-gray-300 py-3 px-4 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-medium">
          <span className="text-rose-700">QUIZ</span>
          <span className="text-rose-800 font-extrabold">Mania</span>
        </h1>
        {/* Conditionally render based on quiz state */}
        {isShowExitButton && (
          <ExitQuizButton onClick={() => {}} label="Exit Quiz" />
        )}
        {/* Conditionally render based on current page */}
        {
          isShowProfile && (
            <div>
              <ProfileHeader name={userName} initial={userName.charAt(0)} />
            </div>
          )
        }

      </div>
    </header>
  );
}
export default QuizHeader;