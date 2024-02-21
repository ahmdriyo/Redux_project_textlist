import { createSlice } from '@reduxjs/toolkit';
import { ItemState } from './types';
const itemSlice = createSlice({
  name: 'item',
  initialState: {
    items: [],
  } as ItemState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;
