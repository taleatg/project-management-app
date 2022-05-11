import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnData } from '../../services/interfaces';
import { getColumnsList } from '../../services/columnService';

interface ColumnState {
  status: string | null;
  error: Error | null;
  currentColumn: ColumnData;
  allColumns: ColumnData[];
}

const columnState: ColumnState = {
  status: null,
  error: null,
  currentColumn: {
    id: '',
    title: '',
    order: 0,
  },
  allColumns: [],
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState: columnState,
  reducers: {
    selectedItem(state, action: PayloadAction<ColumnData>) {
      state.currentColumn = action.payload;
    },
    addItem(state, action: PayloadAction<ColumnData>) {
      state.allColumns = [...state.allColumns, action.payload];
    },
    changeColumn(state, action: PayloadAction<ColumnData>) {
      state.currentColumn = action.payload;
      const upgradeColumnIndex = state.allColumns.findIndex(
        (column: ColumnData) => column.id === action.payload.id
      );
      state.allColumns[upgradeColumnIndex] = action.payload;
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
