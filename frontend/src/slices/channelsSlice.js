/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { fetch } from './loadingSlice.js';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
      });
  },
});

export const {
  addChannel, addChannels, updateChannel,
  removeChannel, setCurrentChannelId, setDefaultChannel,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export const getCurrentChannelId = (state) => state.channelsReducer.currentChannelId;
export const getCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsReducer;
  return state.channelsReducer.entities[currentChannelId];
};

export const getChannelsNames = createSelector(
  (state) => state.channelsReducer.entities,
  (entities) => Object.values(entities).map((channel) => channel.name),
);

export default channelsSlice.reducer;
