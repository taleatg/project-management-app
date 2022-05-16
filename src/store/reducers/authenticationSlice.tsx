import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../../services/interfaces';

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  currentUser: UserInfo;
}

const authState: AuthState = {
  isAuthenticated: false,
  userId: '',
  currentUser: {
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
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.currentUser.id = action.payload.id;
      state.currentUser.name = action.payload.name;
      state.currentUser.login = action.payload.login;
    },
  },
});

export default authSlice.reducer;
