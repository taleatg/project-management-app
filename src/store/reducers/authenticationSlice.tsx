import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../../services/interfaces';

interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  currentUserData: UserData;
  users: UserData[];
}

const authState: AuthState = {
  isAuthenticated: false,
  userId: '',
  currentUserData: {
    id: '',
    name: '',
    login: '',
  },
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
    setCurrentUserData(state, action: PayloadAction<UserData>) {
      state.currentUserData.id = action.payload.id;
      state.currentUserData.name = action.payload.name;
      state.currentUserData.login = action.payload.login;
    },
  },
});

export default authSlice.reducer;
