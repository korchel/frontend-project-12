/* eslint-disable */
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
    renameChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const { addChannel, addChannels, renameChannel, removeChannel, setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
