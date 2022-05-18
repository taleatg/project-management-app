import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LangState {
  lang: string;
}

const langState: LangState = {
  lang: 'en',
};

export const langSlice = createSlice({
  name: 'lang',
  initialState: langState,
  reducers: {
    selectLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
  },
});

export default langSlice.reducer;
