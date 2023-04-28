//Parte responsável por implementar as regras nos detalhes exigidos ao adicionar um local.


import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import InfoField from './InfoField';

const AddDetails = () => {
  const {
    state: {
      details: { title, description, price },
    },
    dispatch,
  } = useValue();
  const [costType, setCostType] = useState(price ? 1 : 0);
  const handleCostTypeChange = (e) => {
    const costType = Number(e.target.value);
    setCostType(costType);
    if (costType === 0) {
      dispatch({ type: 'UPDATE_DETAILS', payload: { price: 0 } });
    } else {
      dispatch({ type: 'UPDATE_DETAILS', payload: { price: 15 } });
    }
  };
  const handlePriceChange = (e) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { price: e.target.value } });
  };
  return (
    <Stack
      sx={{
        alignItems: 'center',
        '& .MuiTextField-root': { width: '100%', maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        <RadioGroup
        
          name="costType"
          value={costType}
          row
          onChange={handleCostTypeChange}
        >
          <FormControlLabel value={0} control={<Radio />} label="Não incluir valor" />
          <FormControlLabel value={1} control={<Radio />} label="Valor Gasto" />
          {Boolean(costType) && (
            <TextField
              sx={{ width: '7ch !important' }}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              inputProps={{ type: 'number', min: 1, max: 50 }}
              value={price}
              onChange={handlePriceChange}
              name="price"
            />
          )}
        </RadioGroup>
      </FormControl>
      <InfoField
        mainProps={{ name: 'title', label: 'Titulo', value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: 'description',
          label: 'Descrição',
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AddDetails;