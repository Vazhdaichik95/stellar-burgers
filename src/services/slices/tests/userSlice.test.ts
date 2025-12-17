import reducer, {
  TUserState,
  registrationUser,
  loginUser,
  logoutUser,
  getUser,
  getOrderAll,
  updateUser,
  userLogout,
  resetError
} from '../userSlice';
import type { TUser, TOrder } from '@utils-types';

describe('userSlice extraReducers', () => {
  const initialState: TUserState = {
    request: false,
    error: null,
    response: null,
    registerData: null,
    userData: null,
    isAuthChecked: false,
    isAuthenticated: false,
    loginUserRequest: false,
    userOrders: []
  };

  // registrationUser
  test('registrationUser.pending выставляет request=true, error=null, isAuthChecked=true, isAuthenticated=false', () => {
    const state = reducer(initialState, {
      type: registrationUser.pending.type
    });

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(false);
  });

  test('registrationUser.rejected выставляет request=false, error, isAuthChecked=false', () => {
    const state = reducer({ ...initialState, request: true }, {
      type: registrationUser.rejected.type,
      error: { message: 'Register error' }
    } as any);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Register error');
    expect(state.isAuthChecked).toBe(false);
  });

  test('registrationUser.fulfilled сохраняет пользователя и авторизует', () => {
    const user: TUser = {
      name: 'Test User',
      email: 'test@example.com'
    };

    const state = reducer({ ...initialState, request: true, error: 'Old' }, {
      type: registrationUser.fulfilled.type,
      payload: { user }
    } as any);

    expect(state.request).toBe(false);
    expect(state.error).toBeNull();
    expect(state.response).toEqual(user);
    expect(state.userData).toEqual(user);
    expect(state.isAuthChecked).toBe(false);
    expect(state.isAuthenticated).toBe(true);
  });

  // loginUser
  test('loginUser.pending: loginUserRequest=true, error=null, isAuthChecked=true, isAuthenticated=false', () => {
    const state = reducer(initialState, { type: loginUser.pending.type });

    expect(state.loginUserRequest).toBe(true);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(false);
  });

  test('loginUser.rejected: loginUserRequest=false, isAuthChecked=false, error устанавливается', () => {
    const state = reducer({ ...initialState, loginUserRequest: true }, {
      type: loginUser.rejected.type,
      error: { message: 'Login error' }
    } as any);

    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('Login error');
  });

  test('loginUser.fulfilled: авторизует и сохраняет userData', () => {
    const user: TUser = {
      name: 'Login User',
      email: 'login@example.com'
    };

    const state = reducer(
      {
        ...initialState,
        loginUserRequest: true,
        isAuthChecked: true,
        isAuthenticated: false
      },
      {
        type: loginUser.fulfilled.type,
        payload: { user }
      } as any
    );

    expect(state.error).toBeNull();
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.userData).toEqual(user);
  });

  // getUser
  test('getUser.pending: isAuthenticated=true, isAuthChecked=true, loginUserRequest=true', () => {
    const state = reducer(initialState, { type: getUser.pending.type });

    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserRequest).toBe(true);
  });

  test('getUser.rejected: isAuthenticated=false, isAuthChecked=false, loginUserRequest=false', () => {
    const state = reducer(
      {
        ...initialState,
        isAuthenticated: true,
        isAuthChecked: true,
        loginUserRequest: true
      },
      {
        type: getUser.rejected.type,
        error: { message: 'Get user error' }
      } as any
    );

    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.loginUserRequest).toBe(false);
  });

  test('getUser.fulfilled: заполняет userData, isAuthenticated=true, isAuthChecked=false, loginUserRequest=false', () => {
    const user: TUser = {
      name: 'Existing User',
      email: 'user@example.com'
    };

    const state = reducer(
      {
        ...initialState,
        isAuthenticated: false,
        isAuthChecked: true,
        loginUserRequest: true
      },
      {
        type: getUser.fulfilled.type,
        payload: { user }
      } as any
    );

    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.loginUserRequest).toBe(false);
    expect(state.userData).toEqual(user);
  });

  // updateUser
  test('updateUser.pending: request=true, error=null', () => {
    const state = reducer(initialState, { type: updateUser.pending.type });

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  test('updateUser.rejected: request=false, error устанавливается', () => {
    const state = reducer({ ...initialState, request: true }, {
      type: updateUser.rejected.type,
      error: { message: 'Update error' }
    } as any);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Update error');
  });

  test('updateUser.fulfilled: request=false, error=null, response=user', () => {
    const user: TUser = {
      name: 'Updated User',
      email: 'updated@example.com'
    };

    const state = reducer({ ...initialState, request: true, error: 'Old' }, {
      type: updateUser.fulfilled.type,
      payload: { user }
    } as any);

    expect(state.request).toBe(false);
    expect(state.error).toBeNull();
    expect(state.response).toEqual(user);
  });

  // logoutUser
  test('logoutUser.pending: isAuthenticated=true, isAuthChecked=true, error=null, request=true', () => {
    const state = reducer(initialState, { type: logoutUser.pending.type });

    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
    expect(state.request).toBe(true);
  });

  test('logoutUser.rejected: isAuthenticated=true, isAuthChecked=false, error, request=false', () => {
    const state = reducer(
      {
        ...initialState,
        isAuthenticated: true,
        isAuthChecked: true,
        request: true
      },
      {
        type: logoutUser.rejected.type,
        error: { message: 'Logout error' }
      } as any
    );

    expect(state.isAuthenticated).toBe(true);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('Logout error');
    expect(state.request).toBe(false);
  });

  test('logoutUser.fulfilled: разлогинивает и очищает userData', () => {
    const state = reducer(
      {
        ...initialState,
        isAuthenticated: true,
        isAuthChecked: true,
        request: true,
        userData: { name: 'User', email: 'u@example.com' } as TUser
      },
      { type: logoutUser.fulfilled.type } as any
    );

    expect(state.isAuthenticated).toBe(false);
    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBeNull();
    expect(state.request).toBe(false);
    expect(state.userData).toBeNull();
  });

  // getOrderAll
  test('getOrderAll.pending: request=true, error=null', () => {
    const state = reducer(initialState, { type: getOrderAll.pending.type });

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  test('getOrderAll.rejected: request=false, error устанавливается', () => {
    const state = reducer({ ...initialState, request: true }, {
      type: getOrderAll.rejected.type,
      error: { message: 'Orders error' }
    } as any);

    expect(state.request).toBe(false);
    expect(state.error).toBe('Orders error');
  });

  test('getOrderAll.fulfilled: записывает userOrders и сбрасывает request/error', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        number: 1001,
        name: 'Order 1',
        status: 'done',
        ingredients: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const state = reducer({ ...initialState, request: true, error: 'Old' }, {
      type: getOrderAll.fulfilled.type,
      payload: orders
    } as any);

    expect(state.request).toBe(false);
    expect(state.error).toBeNull();
    expect(state.userOrders).toEqual(orders);
  });
});
