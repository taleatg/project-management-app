import { ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { BoardData } from '../services/interfaces';
import { boardSlice } from '../store/reducers/boardSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

interface BoardPreviewProps {
  board: BoardData;
}

export const BoardPreview = (props: BoardPreviewProps) => {
  const { selectedBoard } = boardSlice.actions;
  const { allBoard } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();

  function handlerClick() {
    const clickedBoard = allBoard.find((board) => board.id === props.board.id) as BoardData;
    dispatch(selectedBoard(clickedBoard));
  }

  return (
    <ListItem onClick={handlerClick}>
      <ListItemText secondary={props.board.title} />
    </ListItem>
  );
};
