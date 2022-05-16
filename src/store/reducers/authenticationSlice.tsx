import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../services/interfaces';

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  users: UserData[];
}

const authState: AuthState = {
  isAuthenticated: false,
  userId: '',
  users: [],
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
    setUsers(state, action: PayloadAction<UserData[]>) {
      state.users = action.payload;
    },
  },
});

export default authSlice.reducer;
