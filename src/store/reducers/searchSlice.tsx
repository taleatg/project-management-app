import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../../services/interfaces';

interface SearchData {
  isLoading: boolean;
  searchResult: SearchResult[];
}

const searchState: SearchData = {
  isLoading: true,
  searchResult: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: searchState,
  reducers: {
    updateSearchResult(state, action: PayloadAction<SearchResult[]>) {
      state.searchResult = action.payload;
    },
    updateLoadingState(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export default searchSlice.reducer;
