import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { langSlice } from '../store/reducers/langSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function LangSelect() {
  const { selectLang } = langSlice.actions;
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.langReducer);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(selectLang(event.target.value));
  };

  const style = {
    minWidth: '80px',
    position: 'absolute' as const,
    right: '150px',
  };

  const style_select = {
    color: 'white',
  };

  return (
    <Box sx={style}>
      <FormControl fullWidth>
        <InputLabel id="select-lang">Language</InputLabel>
        <Select
          sx={style_select}
          labelId="select-lang"
          id="select-lang"
          value={lang}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={'English'}>EN</MenuItem>
          <MenuItem value={'Russian'}>RU</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
