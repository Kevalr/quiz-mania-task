import React, { useState } from 'react';
import { Category } from '../utils/types/quiz.types';
import QuizRulesModal from './QuizRulesModal';

interface QuizWelcomeProps {
  categories: Category[];
  setQuiz: (name: string, categoryId: string) => void;
}

const QuizWelcome = ({ categories, setQuiz }: QuizWelcomeProps) => {
  // Internal state management
  const [fullName, setFullName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Determine if the start button should be enabled
  const isStartButtonEnabled = fullName.trim() !== '' && selectedCategory !== '';

  const handleStartQuiz = () => {
    if (isStartButtonEnabled) {
      // Pass the name and selected category to parent component
      setQuiz(fullName, selectedCategory);
    }
  };

  return (
    <div className="p-8 flex justify-center items-center">
      <div className="max-w-2xl w-full p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-pink-600">QUIZ</span><span className="text-pink-700">Mania</span>
        </h1>
        
        <div className="bg-gray-100 rounded p-4 mb-6 text-left">
          <p className="text-gray-700 text-sm mb-1">Please read all the rules about this quiz before you start.</p>
          <button 
            onClick={handleOpenModal} 
            className="text-pink-600 text-sm cursor-pointer hover:underline"
          >
            Quiz rules
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2 text-left">Full name</label>
          <input 
            type="text" 
            placeholder="Full name"
            value={fullName}
            onChange={handleNameChange}
            className={`w-full p-2 text-gray-700 rounded ${fullName ? 'border-2 border-pink-600 outline-none' : 'border border-gray-300'}`}
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
        
        <div className="mb-6">
          <p className="block text-sm text-gray-700 mb-2 text-left">Please select topic to continue</p>
          
          <div className="grid grid-cols-2 gap-4 mb-2">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`border rounded p-3 flex items-center cursor-pointer ${
                  selectedCategory === category.id ? 'border-pink-600' : 'border-gray-300'
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="mr-2 w-4 h-4 rounded-full flex items-center justify-center">
                  <div 
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedCategory === category.id ? 'border-pink-600' : 'border-gray-300'
                    }`}
                  >
                    {selectedCategory === category.id && (
                      <div className="w-2 h-2 rounded-full bg-pink-600"></div>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-left">
          <button 
            className={`py-2 px-4 rounded transition duration-200 ${
              isStartButtonEnabled 
                ? 'bg-pink-400 text-white hover:bg-pink-500 cursor-pointer' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleStartQuiz}
            disabled={!isStartButtonEnabled}
          >
            Start Quiz
          </button>
        </div>
      </div>
      <QuizRulesModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default QuizWelcome;