import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

function createData(
  project: string,
  column: string,
  title: string,
  description: string,
  assignee: string
) {
  return { project, column, title, description, assignee };
}

const rows = [createData('Board', 'Done', 'Task', 'some task', 'Vasya')];

export function SearchPage() {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} className="table-container" sx={{ width: '95%', mt: '20px' }}>
      <Table aria-label="simple table">
        <TableHead sx={{ background: 'rgba(0, 0, 0, 0.2)' }}>
          <TableRow>
            <TableCell align="center">{t('search.board')}</TableCell>
            <TableCell align="center">{t('search.column')}</TableCell>
            <TableCell align="center">{t('search.title')}</TableCell>
            <TableCell align="center">{t('search.description')}</TableCell>
            <TableCell align="center">{t('search.assignee')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{row.project}</TableCell>
              <TableCell align="center">{row.column}</TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.assignee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
