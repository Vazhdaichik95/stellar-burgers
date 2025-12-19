// src/services/root-reducer.test.ts
import store, { rootReducer } from './store';

describe('rootReducer', () => {
  test('инициализирует стор с корректной структурой', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual(store.getState());
  });
});
