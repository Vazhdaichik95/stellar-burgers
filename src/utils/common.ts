import { TConstructorIngredient } from '@utils-types';

export const transferIngredientsForAPI = (items: {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}): string[] => {
  const bunId = items.bun ? items.bun._id : '';
  const ingredientsId = items.ingredients.map((item) => item._id);
  return [bunId, ...ingredientsId, bunId];
};
