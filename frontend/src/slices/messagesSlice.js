import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const removedChannelId = action.payload;
      const messagesIds = Object.values(state.entities)
        .filter((message) => message.channelId === removedChannelId)
        .map((message) => message.id);
      messagesAdapter.removeMany(state, messagesIds);
    });
  },
});

export const { addMessage, addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
