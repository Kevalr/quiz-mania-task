import { Category } from '../types/quiz.types';
import { quizData } from '../constants/quiz-data';

/**
 * Get quiz category by category ID
 * @param categoryId - The ID of the category to find
 * @returns The category object
 * @throws Error if category is not found
 */
export const getQuizByCategory = (categoryId: string): Category => {
  const category = quizData.categories.find((category) => category.id === categoryId);
  if (!category) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }
  return category;
};

/**
 * Get all available quiz categories
 * @returns Array of all available categories
 */
export const getAllQuizCategories = (): Category[] => {
  return quizData.categories;
};
