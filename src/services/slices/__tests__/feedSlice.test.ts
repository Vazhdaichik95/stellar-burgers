// src/services/slices/feedSlice.test.ts
import reducer, { getFeeds, TFeedState } from '../feedSlice';

import type { TOrder } from '@utils-types';

describe('feedSlice extraReducers', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  test('ставит loading=true и сбрасывает error при getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });

  test('ставит loading=false и error при getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Network error' }
    };

    const state = reducer({ ...initialState, loading: true }, action as any);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Network error');
  });

  test('заполняет заказы и тоталы при getFeeds.fulfilled и сбрасывает loading/error', () => {
    const payload = {
      orders: [
        {
          _id: '1',
          status: 'success',
          name: 'Тестовый бургер',
          createdAt: '2025-12-17',
          updatedAt: '2025-12-17',
          number: 1,
          ingredients: []
        } as TOrder
      ],
      total: 500,
      totalToday: 20
    };

    const action = {
      type: getFeeds.fulfilled.type,
      payload
    };

    const state = reducer(
      { ...initialState, loading: true, error: 'Old error' },
      action as any
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(500);
    expect(state.totalToday).toBe(20);
  });
});
