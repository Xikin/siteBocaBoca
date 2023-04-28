//Componente responsavel por Aplicar a filtragem por Por preço Estabelecido no cadastro do local usando um Slider

import { Box, Slider, Typography } from '@mui/material';
import React from 'react';
import { useValue } from '../../context/ContextProvider';

const marks = [
  { value: 0, label: 'R$0' },
  { value: 25, label: 'R$25' },
  { value: 50, label: 'R$50' },
  { value: 100, label: 'R$100' },

];

const PriceSlider = () => {
  const {
    state: { priceFilter },
    dispatch,
  } = useValue();
  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Preço Máximo: {'R$ ' + priceFilter}</Typography>
      <Slider
        min={0}
        max={100}
        defaultValue={100}
        valueLabelDisplay="auto"
        marks={marks}
        value={priceFilter}
        onChange={(e, price) =>
          dispatch({ type: 'FILTER_PRICE', payload: price })
        }
      />
    </Box>
  );
};
 
export default PriceSlider;