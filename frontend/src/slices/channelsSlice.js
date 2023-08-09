/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

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
export const getChannelsNames = (state) => state.channelsReducer.ids
  .map((id) => state.channelsReducer.entities[id].name)
export default channelsSlice.reducer;

