import { configureStore } from '@reduxjs/toolkit';
import helloReducer from '../features/hello/helloSlice';
import authReducer from '../features/auth/services/authSlice';
import { authApi } from '../features/auth/services/authApi';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});
