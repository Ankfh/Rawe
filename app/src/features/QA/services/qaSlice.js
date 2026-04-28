import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [], // [{ role: 'user', content: '...' }, { role: 'ai', content: '...' }]
  isLoading: false,
  error: null,
};

const qaSlice = createSlice({
  name: 'qa',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const { addMessage, setLoading, setError, clearChat } = qaSlice.actions;

export const selectMessages = (state) => state.qa.messages;
export const selectQAStatus = (state) => ({
  isLoading: state.qa.isLoading,
  error: state.qa.error,
});

export default qaSlice.reducer;
