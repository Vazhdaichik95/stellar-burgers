import reducer, { TOrderState, getOrderByNumber } from '../orderSlice';
import type { TOrder } from '@utils-types';

describe('orderSlice extraReducers', () => {
  const initialState: TOrderState = {
    orders: [],
    orderByNumberResponse: null,
    request: false,
    responseOrder: null,
    error: null
  };

  test('ставит request=true и error=null при getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };

    const state = reducer(initialState, action);

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
    expect(state.orderByNumberResponse).toBeNull();
  });

  test('ставит request=false и сохраняет error при getOrderByNumber.rejected', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Order not found' }
    };

    const state = reducer({ ...initialState, request: true }, action as any);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Order not found');
    expect(state.orderByNumberResponse).toBeNull();
  });

  test('ставит request=false, error=null и записывает orderByNumberResponse при getOrderByNumber.fulfilled', () => {
    const order: TOrder = {
      _id: '1',
      number: 12345,
      name: 'Тестовый заказ',
      status: 'done',
      ingredients: [],
      createdAt: '2025-12-17',
      updatedAt: '2025-12-17'
    };

    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [order] }
    };

    const state = reducer(
      { ...initialState, request: true, error: 'Old error' },
      action as any
    );

    expect(state.request).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orderByNumberResponse).toEqual(order);
  });
});
