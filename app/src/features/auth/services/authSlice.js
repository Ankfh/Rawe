import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  userData: null,
  accessToken: null,
  authLoading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action) => {
      const { token, user } = action.payload || {};
      console.log(user, '+++helloo+++');
      state.accessToken = token || null;
      state.userData = user || null;
      state.isLogin = Boolean(token && user);
    },
    setToken: (state, action) => {
      state.accessToken = action.payload || null;
      state.isLogin = Boolean(state.accessToken && state.userData);
    },
    clearSession: state => {
      state.accessToken = null;
      state.userData = null;
      state.isLogin = false;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
  },
});

export const { setSession, setToken, clearSession, setAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;
