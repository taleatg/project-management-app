import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData } from '../../services/interfaces';

interface BoardState {
  currentBoard: BoardData;
}

const boardState: BoardState = {
  currentBoard: {
    id: '',
    title: '',
  },
};

export const boardSlice = createSlice({
  name: 'board',
  initialState: boardState,
  reducers: {
    selectedBoard(state, action: PayloadAction<BoardData>) {
      state.currentBoard = action.payload;
    },
  },
});

export default boardSlice.reducer;
