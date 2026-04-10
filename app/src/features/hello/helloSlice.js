import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'World',
};

export const helloSlice = createSlice({
  name: 'hello',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = helloSlice.actions;

export default helloSlice.reducer;
