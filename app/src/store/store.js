import { configureStore } from '@reduxjs/toolkit';
import helloReducer from '../features/hello/helloSlice';
import authReducer from '../features/auth/services/authSlice';
import qaReducer from '../features/QA/services/qaSlice';
import { authApi } from '../features/auth/services/authApi';
import { adminSettingsApi } from '../components/adminSettings/services/adminSettingsApi';

export const store = configureStore({
  reducer: {
    hello: helloReducer,
    auth: authReducer,
    qa: qaReducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminSettingsApi.reducerPath]: adminSettingsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, adminSettingsApi.middleware),
});
