import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store/store';
import { Alert } from '@mui/material';

export function SearchPage() {
  const { t } = useTranslation();
  const { searchResult } = useAppSelector((state) => state.searchReducer);

  return (
    <>
      {searchResult.length ? (
        <TableContainer
          component={Paper}
          className="table-container"
          sx={{ width: '95%', mt: '20px' }}
        >
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
              {searchResult.map((row) => (
                <TableRow
                  key={row.taskId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.board}</TableCell>
                  <TableCell align="center">{row.column}</TableCell>
                  <TableCell align="center" sx={{ background: 'rgba(0, 0, 0, 0.05)' }}>
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.assignee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert
          severity="success"
          color="info"
          sx={{ m: '0 auto', maxWidth: '1440px', position: 'relative', top: '20px' }}
        >
          {t('search.not_found')}
        </Alert>
      )}
    </>
  );
}
