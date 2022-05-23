import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../../services/interfaces';

interface SearchData {
  searchResult: SearchResult[];
}

const search: SearchData = {
  searchResult: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: search,
  reducers: {
    updateSearchResult(state, action: PayloadAction<SearchResult[]>) {
      console.log('payload', action.payload);
      state.searchResult = action.payload;
    },
  },
});

export default searchSlice.reducer;
