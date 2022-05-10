import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData } from '../../services/interfaces';
import { getColumnsList } from '../../services/columnService';

interface ColumnState {
  status: string | null;
  error: Error | null;
  currenColumn: ColumnData;
  allColumns: ColumnData[];
  currentTask: ColumnData;
  allTasks: ColumnData[];
}

const columnState: ColumnState = {
  status: null,
  error: null,
  currenColumn: {
    id: '',
    title: '',
    order: 0,
  },
  currentTask: {
    id: '',
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
  },
  allTasks: [],
  allColumns: [],
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState: columnState,
  reducers: {
    selectedItem(
      state,
      action: PayloadAction<{ currentColumn: ColumnData; currentTask: ColumnData }>
    ) {
      state.currenColumn = action.payload.currentColumn;
      state.currentTask = action.payload.currentTask;
    },
    addItem(state, action: PayloadAction<{ currentColumn: ColumnData; currentTask: ColumnData }>) {
      state.allColumns = [...state.allColumns, action.payload.currentColumn];
      state.allTasks = [...state.allTasks, action.payload.currentTask];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColumnsList.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(getColumnsList.fulfilled, (state, action: PayloadAction<ColumnData[]>) => {
      state.status = 'resolved';
      state.allColumns = action.payload;
    });
    builder.addCase(getColumnsList.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload as Error;
    });
  },
});

export default columnSlice.reducer;
