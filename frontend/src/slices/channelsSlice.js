/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const fetchChannels = createAsyncThunk(
  'fetchChannels',
  async (token) => {
    const responce = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` }});
    const {channels, currentChannelId} = responce.data;
    return {channels, currentChannelId};
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  getloadingState: 'idle',
  error: null,
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
      .addCase(fetchChannels.pending, (state) => {
        state.getloadingState = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        channelsSlice.actions.setCurrentChannelId(state, action.payload.currentChannelId);
        state.getloadingState = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.getloadingState = 'failed';
        state.error = action.error;
      })
  }
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
  .map((id) => state.channelsReducer.entities[id].name);
export const getloadingState = (state) => state.channelsReducer.getloadingState;
export const getLoadingError = (state) => state.channelsReducer.error;
export default channelsSlice.reducer;
