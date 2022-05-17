import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { langSlice } from '../store/reducers/langSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { Tooltip, Zoom } from '@mui/material';

export default function LangSelect() {
  const { selectLang } = langSlice.actions;
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.langReducer);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(selectLang(event.target.value));
  };

  const style_select = {
    color: 'white',
    padding: '0',
  };

  return (
    <Box>
      <FormControl fullWidth variant="standard">
        <Tooltip title="language" TransitionComponent={Zoom} arrow color="inherit">
          <Select
            sx={style_select}
            labelId="select-lang"
            id="select-lang"
            value={lang}
            label="Language"
            onChange={handleChange}
            disableUnderline
          >
            <MenuItem value={'English'}>EN</MenuItem>
            <MenuItem value={'Russian'}>RU</MenuItem>
          </Select>
        </Tooltip>
      </FormControl>
    </Box>
  );
}
