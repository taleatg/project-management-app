import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchData {
  text: string;
}

const search: SearchData = {
  text: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: search,
  reducers: {
    updateSearch(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
});

export default searchSlice.reducer;
