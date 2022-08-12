import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Popover,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState } from 'react';
import { Button } from '../index';
import { FilterProps, FilterState } from './typing';

const Filter: React.FC<FilterProps> = ({
  anchorEl,
  user,
  currentUser,
  onConfirm,
  onClose,
}) => {
  const [state, setState] = useState<FilterState>({
    value: '',
  });

  const open = Boolean(anchorEl);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ value: e.target.value });
  };

  return (
    <Popover
      id="filter"
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Ordenar por:</FormLabel>
          <RadioGroup
            aria-label="filter"
            name="filter"
            value={state.value}
            onChange={handleChange}
          >
            <FormControlLabel value="new" control={<Radio />} label="Novas" />
            <FormControlLabel value="complete" control={<Radio />} label="Concluídas" />
            {currentUser?.id === user?.user.id && (
              <FormControlLabel value="show" control={<Radio />} label="Públicas" />
            )}
            {currentUser?.id === user?.user.id && (
              <FormControlLabel value="hide" control={<Radio />} label="Privadas" />
            )}
          </RadioGroup>
        </FormControl>
        <Button
          onClick={() => {
            onConfirm(state);
            onClose();
          }}
          text="Aplicar"
        />
      </div>
    </Popover>
  );
};

export default Filter;
