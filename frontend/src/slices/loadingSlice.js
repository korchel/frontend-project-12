/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

const slow = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};
export const fetch = createAsyncThunk(
  'fetch',
  async (token) => {
    await slow();
    const responce = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` }});
    const { channels, currentChannelId, messages } = responce.data;
    return { channels, currentChannelId, messages };
  },
);

const initialState = {
  loadingState: 'idle',
  error: null,
  data: null,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.loadingState = 'loading';
        state.error = null;
      })
      .addCase(fetch.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadingState = 'idle';
        state.error = null;
      })
      .addCase(fetch.rejected, (state, action) => {
        state.loadingState = 'failed';
        state.error = action.error;
      })
  }
});

export const getloadingState = (state) => state.loadingReducer.loadingState;
export const getLoadingError = (state) => state.loadingReducer.error;
export default loadingSlice.reducer;