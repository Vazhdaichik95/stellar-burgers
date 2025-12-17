// src/services/ingredients/slice.test.ts
import reducer, { getIngredients, IngredientsState } from '../ingredientsSlice';

describe('ingredients slice test', () => {
  const initialState: IngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  test('ставит isLoading в true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.ingredients).toEqual([]);
    expect(state.error).toBeNull();
  });

  test('записывает данные и сбрасывает isLoading при getIngredients.fulfilled', () => {
    const payload = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload
    };

    const state = reducer({ ...initialState, isLoading: true }, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(payload);
    expect(state.error).toBeNull();
  });

  test('записывает ошибку и сбрасывает isLoading при getIngredients.rejected', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Network error' }
    };

    const state = reducer({ ...initialState, isLoading: true }, action as any);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Network error');
  });
});
