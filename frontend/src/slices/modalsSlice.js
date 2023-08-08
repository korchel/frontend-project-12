/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.channelId = payload.id;
    },
    closeModal: (state) => {
      state.type = null;
      state.channelId = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export const getModalType = (state) => state.modalsReducer.type;
export const getChannelId = (state) => state.modalsReducer.channelId;
export default modalsSlice.reducer;
