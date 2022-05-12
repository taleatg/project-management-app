import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData } from '../../services/interfaces';
import { getColumnsList } from '../../services/columnService';

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
    getAllTasks(state, action) {
      state.currentColumn.tasks = action.payload;
    },
    selectedColumn(state, action: PayloadAction<ColumnData>) {
      state.currentColumn = action.payload;
    },
    addColumn(state, action: PayloadAction<ColumnData>) {
      state.allColumns = [...state.allColumns, action.payload];
      state.currentColumn = action.payload;
    },
    addTask(state, action: PayloadAction<ColumnData>) {
      // state.allColumns = [...state.allColumns, action.payload];
      state.allColumns.filter((column) => {
        // action.payload.id - columnId передать
        if (column.id === action.payload.id) {
          // column.tasks.push(action.payload.task) // передать таск
        }
      });
    },

    deleteTaskFromState(state, action: PayloadAction<string>) {
      // state.allTasks.filter((task, index) => {
      //   if (task.id === action.payload) {
      //     state.allTasks.splice(index, 1);
      //   }
      // });
      // console.log('delete', state.allTasks);
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
