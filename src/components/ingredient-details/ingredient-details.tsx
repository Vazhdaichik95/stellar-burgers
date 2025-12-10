import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const id = useParams().id;
  const ingredientData = useSelector(getAllIngredients).find((item) => {
    if (item._id === id) {
      return item;
    }
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
