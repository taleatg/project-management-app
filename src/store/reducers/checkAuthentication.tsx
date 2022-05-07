import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const authState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'authorization',
  initialState: authState,
  reducers: {
    switchAuthorization(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
  },
});

export default authSlice.reducer;
