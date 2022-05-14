import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData } from '../../services/interfaces';
import { getColumnsList } from '../../services/columnService';
import { getTasksInColumn } from '../../services/taskService';

interface ColumnState {
  status: string | null;
  error: Error | null;
  currentColumn: ColumnData;
  allColumns: ColumnData[];
}

export const columnState: ColumnState = {
  status: null,
  error: null,
  currentColumn: {
    id: '',
    title: '',
    order: 0,
    tasks: [
      {
        id: '',
        title: '',
        order: 1,
        done: false,
        description: '',
        userId: '',
        files: [
          {
            filename: '',
            fileSize: 0,
          },
        ],
      },
    ],
  },
  allColumns: [],
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState: columnState,
  reducers: {
    selectedColumn(state, action: PayloadAction<ColumnData>) {
      state.currentColumn = action.payload;
    },
    addColumn(state, action: PayloadAction<ColumnData>) {
      state.allColumns = [...state.allColumns, action.payload];
      state.currentColumn = action.payload;
    },
    changeColumn(state, action: PayloadAction<ColumnData>) {
      state.currentColumn = action.payload;
      const upgradeColumnIndex = state.allColumns.findIndex(
        (column: ColumnData) => column.id === action.payload.id
      );
      state.allColumns[upgradeColumnIndex] = action.payload;
    },
    removeColumn(state, action: PayloadAction<string>) {
      state.allColumns = state.allColumns.filter((column) => column.id !== action.payload);
    },
    addTask(state, action) {
      state.allColumns
        .filter((column) => column.id === action.payload?.columnId)[0]
        .tasks?.push(action.payload.data);
    },
    removeTask(state, action) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.allColumns.filter((column) => column.id === action.payload.columnId)[0].tasks = //TODO: как записать правильно, чтобы ts не ругался?
        state.allColumns
          .filter((column) => column.id === action.payload.columnId)[0]
          .tasks.filter((task) => task.id !== action.payload.taskId);
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
    builder.addCase(getTasksInColumn.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.allColumns.filter((column) => column.id === action.payload?.columnId)[0].tasks =
        action.payload?.tasks;
    });
    builder.addCase(getTasksInColumn.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload as Error;
    });
  },
});

export default columnSlice.reducer;
