import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData, TaskData } from '../../services/interfaces';
import { deleteBoard, getBoardById, getBoardsList, postBoard } from '../../services/boardService';

interface BoardState {
  status: string | null;
  error: Error | null;
  draggableTask: TaskData | null;
  currentBoard: BoardData;
  allBoard: BoardData[];
}

const boardState: BoardState = {
  status: null,
  error: null,
  draggableTask: null,
  currentBoard: {
    id: '',
    title: '',
    description: '',
  },
  allBoard: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState: boardState,
  reducers: {
    selectedBoard(state, action: PayloadAction<BoardData>) {
      state.currentBoard.id = action.payload.id;
      state.currentBoard.title = action.payload.title;
    },
    addNewBoardInState(state, action: PayloadAction<BoardData>) {
      state.allBoard.push(action.payload);
    },
    setDraggableTask(state, action: PayloadAction<TaskData>) {
      state.draggableTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardById.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.currentBoard.id = action.payload.id;
      state.currentBoard.title = action.payload.title;
    });
    builder.addCase(getBoardById.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload as Error;
    });
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
    builder.addCase(postBoard.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.allBoard.push(action.payload);
    });
    builder.addCase(postBoard.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload as Error;
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.allBoard = state.allBoard.filter((board) => {
        return board.id !== action.payload;
      });
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload as Error;
    });
  },
});

export default boardSlice.reducer;
