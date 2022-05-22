import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './reducers/authenticationSlice';
import boardReducer from './reducers/boardSlice';
import columnReducer from './reducers/columnSlice';
import searchReducer from './reducers/searchSlice';

const rootReducer = combineReducers({
  authReducer,
  boardReducer,
  columnReducer,
  searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
