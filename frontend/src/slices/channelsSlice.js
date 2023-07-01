import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const channelsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
  },
});

export default channelsSlice.reducer;
