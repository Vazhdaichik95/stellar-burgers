import reducer, {
  addIngredient,
  removeIngredient,
  moveDownIngredient,
  moveUpIngredient,
  TConstructorState
} from '../constructorSlice';

describe('burgerConstructor slice test', () => {
  const bun = {
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
  };
  const filling1 = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };
  const filling2 = {
    _id: '643d69a5c3f7b9001cfa094a',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
    __v: 0
  };

  const initialState: TConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    loading: false
  };

  test('добавляет ингредиент (булка и начинка)', () => {
    let state = reducer(initialState, addIngredient(bun));
    expect(state.constructorItems.bun?._id).toBe(bun._id);

    state = reducer(state, addIngredient(filling1));
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]._id).toBe(filling1._id);
  });

  test('удаляет ингредиент из начинки', () => {
    const stateWithFillings: TConstructorState = {
      constructorItems: {
        bun: { ...bun, id: 'testBun' },
        ingredients: [
          { ...filling1, id: 'testFilling1' },
          { ...filling2, id: 'testFilling2' }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false
    };

    const state = reducer(stateWithFillings, removeIngredient('testFilling1'));

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]._id).toBe(filling2._id);
  });

  test('меняет порядок ингредиентов в начинке', () => {
    const stateWithFillings: TConstructorState = {
      constructorItems: {
        bun: { ...bun, id: 'testBun' },
        ingredients: [
          { ...filling1, id: 'testFilling1' },
          { ...filling2, id: 'testFilling2' }
        ]
      },
      orderRequest: false,
      orderModalData: null,
      loading: false
    };

    const state = reducer(stateWithFillings, moveDownIngredient(0));

    expect(state.constructorItems.ingredients[0]._id).toBe(filling2._id);
    expect(state.constructorItems.ingredients[1]._id).toBe(filling1._id);

    const state2 = reducer(stateWithFillings, moveUpIngredient(1));

    expect(state2.constructorItems.ingredients[0]._id).toBe(filling2._id);
    expect(state2.constructorItems.ingredients[1]._id).toBe(filling1._id);
  });
});
