import { useState } from 'react';
import { getAllQuizCategories } from './utils/helpers';
import './App.css';
import QuizWelcome from './components/QuizWelcome';
import Quiz from './components/Quiz';
import QuizHeader from './components/Header/QuizHeader';
import QuizResult from './components/QuizResult';

// Define the steps for our application flow
enum Step {
  WELCOME = 'welcome',
  QUIZ = 'quiz',
  RESULT = 'result'
}

function App() {
  // Current step in the flow
  const [currentStep, setCurrentStep] = useState<Step>(Step.WELCOME);
  
  // State for user data and quiz
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [quizScore, setQuizScore] = useState<{ score: {correct: number, wrong:number}; total: number } | null>(null);

  const categories = getAllQuizCategories();

  // Updated to match our new QuizWelcome component's setQuiz prop
  const handleSetQuiz = (name: string, categoryId: string) => {
    setFullName(name);
    setSelectedCategory(categoryId);
    setCurrentStep(Step.QUIZ);
  };

  const handleQuizComplete = (score: {correct: number, wrong:number}, totalQuestions: number, correct: number, incorrect: number, unanswered: number) => {
    console.log(`Quiz completed! Score: ${score}/${totalQuestions}`);
    setQuizScore({ score, total: totalQuestions });
    setCurrentStep(Step.RESULT);
  };

  const handleRetakeQuiz = () => {
    // Reset score data
    setQuizScore(null);
    // Go back to quiz step
    setCurrentStep(Step.QUIZ);
  };

  return (
    <div className="app">
      <QuizHeader isShowExitButton={currentStep === Step.QUIZ} isShowProfile={currentStep === Step.RESULT} userName={fullName}/>
      <div className="category-list">
        {currentStep === Step.WELCOME && (
          <QuizWelcome
            categories={categories}
            setQuiz={handleSetQuiz}
          />
        )}

        {currentStep === Step.QUIZ && selectedCategory && (
          <Quiz 
            category={categories.find(c => c.id === selectedCategory) || categories[0]} 
            onQuizComplete={handleQuizComplete}
          />
        )}

        {currentStep === Step.RESULT && quizScore && (
          <QuizResult 
            score={quizScore.score.correct * 10}
            totalQuestions={quizScore.total}
            correctAnswers={quizScore.score.correct}
            incorrectAnswers={quizScore.score.wrong}
            notAnswered={10 - (quizScore.score.wrong + quizScore.score.correct)}
            onRetakeQuiz={handleRetakeQuiz}
          />
        )}
      </div>
    </div>
  );
}

export default App;