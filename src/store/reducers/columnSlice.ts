import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData, DataForChangeId, TaskData, UpdateTask } from '../../services/interfaces';
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
        description: '',
        userId: '',
        columnId: '',
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
      state.allColumns[upgradeColumnIndex].id = action.payload.id;
      state.allColumns[upgradeColumnIndex].title = action.payload.title;
      state.allColumns[upgradeColumnIndex].order = action.payload.order;
    },
    removeColumn(state, action: PayloadAction<string>) {
      state.allColumns = state.allColumns.filter((column) => column.id !== action.payload);
    },
    replaceColumns(state, action: PayloadAction<ColumnData[]>) {
      state.allColumns.splice(action.payload[0].order - 1, 1, action.payload[1]);
      state.allColumns.splice(action.payload[1].order - 1, 1, action.payload[0]);
    },
    addTask(state, action) {
      const column = state.allColumns.filter((column) => column.id === action.payload?.columnId);
      if (column[0]) {
        column[0].tasks = [...column[0].tasks, action.payload.data];
      }
    },
    removeTask(state, action) {
      state.allColumns.filter((column) => column.id === action.payload.columnId)[0].tasks =
        state.allColumns
          .filter((column) => column.id === action.payload.columnId)[0]
          .tasks.filter((task) => task.id !== action.payload.taskId);
    },
    changedTask(state, action: PayloadAction<UpdateTask>) {
      const upgradeTaskIndex: number = state.allColumns
        .filter((column) => column.id === action.payload.columnId)[0]
        .tasks.findIndex((task) => task.id === action.payload.id);

      state.allColumns.map((column) => {
        if (column.id === action.payload.columnId) {
          column.tasks[upgradeTaskIndex].id = action.payload.id;
          column.tasks[upgradeTaskIndex].title = action.payload.title;
          column.tasks[upgradeTaskIndex].description = action.payload.description;
          column.tasks[upgradeTaskIndex].order = action.payload.order;
          column.tasks[upgradeTaskIndex].userId = action.payload.userId;
        }
      });
    },
    replaceTasks(state, action) {
      const currentColumnIndex = state.allColumns.findIndex(
        (column) => column.id === action.payload[0]
      );
      if (action.payload[1].columnId === action.payload[3]) {
        if (action.payload[1].order > action.payload[2].order) {
          state.allColumns[currentColumnIndex].tasks.splice(
            action.payload[1].order,
            0,
            action.payload[2]
          );
          state.allColumns[currentColumnIndex].tasks.splice(action.payload[2].order - 1, 1);
        } else {
          state.allColumns[currentColumnIndex].tasks.splice(
            action.payload[1].order - 1,
            0,
            action.payload[2]
          );
          state.allColumns[currentColumnIndex].tasks.splice(action.payload[2].order, 1);
        }
      } else {
        state.allColumns[currentColumnIndex].tasks.splice(
          action.payload[1].order - 1,
          0,
          action.payload[2]
        );
      }
    },
    changeTaskOrder(state, action: PayloadAction<string>) {
      const currentColumnIndex = state.allColumns.findIndex(
        (column) => column.id === action.payload
      );
      state.allColumns[currentColumnIndex].tasks.map((task, index) => {
        task.order = index + 1;
      });
    },
    changeTaskId(state, action: PayloadAction<DataForChangeId>) {
      const updatableTask = state.allColumns
        .filter((column) => column.id === action.payload.columnId)[0]
        .tasks.find((task) => task.id === action.payload.oldId);

      (updatableTask as TaskData).id = action.payload.newId;
    },
    removeAllColumns(state) {
      state.allColumns = [];
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
      const column = state.allColumns.filter((column) => column.id === action.payload?.columnId);
      if (column[0]) {
        column[0].tasks = action.payload?.tasks;
      }
    });
    builder.addCase(getTasksInColumn.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.payload as Error;
    });
  },
});

export default columnSlice.reducer;
