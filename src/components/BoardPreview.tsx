import { Divider, List, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BoardData, ColumnData } from '../services/interfaces';
import { boardSlice } from '../store/reducers/boardSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { getColumns } from '../services/columnService';
import { getTasks } from '../services/taskService';
import { useTranslation } from 'react-i18next';

interface BoardPreviewProps {
  board: BoardData;
}

export const BoardPreview = (props: BoardPreviewProps) => {
  const { selectedBoard } = boardSlice.actions;
  const { allBoard } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();
  const [columns, setColumns] = useState(0);
  const [tasks, setTasks] = useState(0);
  const { t } = useTranslation();

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
      <ListItem>
        <ListItemText primary={props.board.title} />
      </ListItem>
      <ListItem>
        <ListItemText secondary={props.board.description} sx={{ p: 0 }} />
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemText secondary={`${t('board.columns')}: ${columns}`} sx={{ p: 0 }} />
        <ListItemText secondary={`${t('board.tasks')}: ${tasks}`} sx={{ p: 0 }} />
      </ListItem>
    </List>
  );
};
