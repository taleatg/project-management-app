import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../services/interfaces';

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  currentUserData: UserData;
}

const authState: AuthState = {
  isAuthenticated: false,
  userId: '',
  currentUserData: {
    id: '',
    name: '',
    login: '',
  },
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
    setCurrentUserData(state, action: PayloadAction<UserData>) {
      state.currentUserData.id = action.payload.id;
      state.currentUserData.name = action.payload.name;
      state.currentUserData.login = action.payload.login;
    },
  },
});

export default authSlice.reducer;
