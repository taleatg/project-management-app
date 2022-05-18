import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

export default function LangSelect() {
  const cookies = useCookies(['i18next'])[0];
  const [lang, setLang] = useState(cookies.i18next || 'en');
  const { i18n } = useTranslation();

  const handleChange = async (event: SelectChangeEvent) => {
    setLang(event.target.value);
    await i18n.changeLanguage(event.target.value);
  };

  const style_select = {
    color: 'white',
    padding: '0',
  };

  return (
    <Box>
      <FormControl fullWidth variant="standard">
        <Select
          sx={style_select}
          labelId="select-lang"
          id="select-lang"
          value={lang}
          onChange={handleChange}
          disableUnderline
        >
          <MenuItem value={'en'}>EN</MenuItem>
          <MenuItem value={'ru'}>RU</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
