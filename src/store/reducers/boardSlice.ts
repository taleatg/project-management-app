import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData } from '../../services/interfaces';
import { getBoardsList } from '../../services/boardService';

interface BoardState {
  status: string | null;
  error: Error | null;
  currentBoard: BoardData;
  allBoard: BoardData[];
}

const boardState: BoardState = {
  status: null,
  error: null,
  currentBoard: {
    id: '',
    title: '',
  },
  allBoard: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState: boardState,
  reducers: {
    selectedBoard(state, action: PayloadAction<BoardData>) {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardsList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(getBoardsList.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.allBoard = action.payload;
    });
    builder.addCase(getBoardsList.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload as Error;
    });
  },
});

export default boardSlice.reducer;
