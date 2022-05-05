import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function LangSelect() {
  const [lang, setLang] = React.useState('English');

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="select-lang">Language</InputLabel>
        <Select
          labelId="select-lang"
          id="select-lang"
          value={lang}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value={'English'}>English</MenuItem>
          <MenuItem value={'Russian'}>Russian</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
