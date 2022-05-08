import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  userId: string;
}

const authState: AuthState = {
  isAuthenticated: false,
  token: '',
  userId: '',
};

export const authSlice = createSlice({
  name: 'authorization',
  initialState: authState,
  reducers: {
    switchAuthorization(state, action: PayloadAction<AuthState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
  },
});

export default authSlice.reducer;
