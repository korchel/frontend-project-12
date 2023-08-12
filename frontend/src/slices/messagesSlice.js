/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';
import { removeChannel } from './channelsSlice';

export const fetchMessages = createAsyncThunk(
  'fetchMessages',
  async (token) => {
    const responce = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` }});
    return responce.data.messages;
  },
);

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  loadingMessages: 'idle',
  error: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const removedChannelId = action.payload;
        const messagesIds = Object.values(state.entities)
          .filter((message) => message.channelId === removedChannelId)
          .map((message) => message.id);
        messagesAdapter.removeMany(state, messagesIds);
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loadingMessages = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload);
        state.loadingMessages = 'idle';
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingMessages = 'failed';
        state.error = action.error;
      })
  },
});

export const { addMessage, addMessages } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
export default messagesSlice.reducer;
