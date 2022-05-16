import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
}

const authState: AuthState = {
  isAuthenticated: false,
  userId: '',
};

export const authSlice = createSlice({
  name: 'authorization',
  initialState: authState,
  reducers: {
    switchAuthorization(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});

export default authSlice.reducer;
