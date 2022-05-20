import { List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BoardData, ColumnData } from '../services/interfaces';
import { boardSlice } from '../store/reducers/boardSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getColumns } from '../services/columnService';
import { getTasks } from '../services/taskService';

interface BoardPreviewProps {
  board: BoardData;
}

export const BoardPreview = (props: BoardPreviewProps) => {
  const { selectedBoard } = boardSlice.actions;
  const { allBoard } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();
  const [columns, setColumns] = useState(0);
  const [tasks, setTasks] = useState(0);

  useEffect(() => {
    const getCountColumns = async () => {
      const columns = await getColumns(props.board.id);
      const countTasks = await columns.reduce(async (count: number, column: ColumnData) => {
        const task = (await getTasks({ boardId: props.board.id, columnId: column.id })).length;
        return (await count) + task;
      }, 0);
      setColumns(columns.length);
      setTasks(countTasks);
    };
    getCountColumns();
  }, [props.board.id]);

  function handlerClick() {
    const clickedBoard = allBoard.find((board) => board.id === props.board.id) as BoardData;
    dispatch(selectedBoard(clickedBoard));
  }

  return (
    <List onClick={handlerClick}>
      <ListItem sx={{ p: '0 16px' }}>
        <ListItemText primary={props.board.title} />
      </ListItem>
      <ListItem sx={{ p: '0 16px' }}>
        <ListItemText secondary={`columns: ${columns}`} />
        <ListItemText secondary={`tasks: ${tasks}`} />
      </ListItem>
    </List>
  );
};
