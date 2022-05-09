import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import langReducer from './reducers/langSlice';
import authReducer from './reducers/authenticationSlice';
import boardReducer from './reducers/boardSlice';
import columnReducer from './reducers/columnSlice';

const rootReducer = combineReducers({
  langReducer,
  authReducer,
  boardReducer,
  columnReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
