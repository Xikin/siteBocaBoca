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
import { StarBorder } from '@mui/icons-material';
import { useState } from 'react';
import { useValue } from '../../../context/ContextProvider';
import InfoField from './InfoField';
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const AddDetails = () => {

  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied',
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  //rating for money
  const StyledRatingMoney = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const customIconMoney = {
    1: {
      icon: <RiMoneyDollarCircleFill  />,
      label: 'Muito Barato',
    },
    2: {
      icon: <RiMoneyDollarCircleFill  />,
      label: 'Barato',
    },
    3: {
      icon: <RiMoneyDollarCircleFill  />,
      label: 'Custo Benefico',
    },
    4: {
      icon: <RiMoneyDollarCircleFill  />,
      label: 'Caro',
    },
    5: {
      icon: <RiMoneyDollarCircleFill  />,
      label: 'Muito Caro',
    },
  };

  function IconContainerMoney(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIconMoney[value].icon}</span>;
  }

  IconContainerMoney.propTypes = {
    value: PropTypes.number.isRequired,
  };



  const {
    state: {
      details: { title, description, price, ratings, money },
    },
    dispatch,
  } = useValue();
  const [felicidade, setRating] = useState(ratings);
  const [dinheiro, setMoney] = useState(money);
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
  const handleRatingChange = (event, newValue) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { ratings: event.target.value } });

    setRating(newValue);
  };
  const handleMoneyChange = (event, newValue) => {
    dispatch({ type: 'UPDATE_DETAILS', payload: { money: event.target.value } });

    setMoney(newValue);
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
              sx={{ width: '11ch !important' }}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              inputProps={{ type: 'number', min: 1, max: 100000 }}
              value={price}
              onChange={handlePriceChange}
              name="price"
            />
          )}



        </RadioGroup>
        <StyledRating
          name="highlight-selected-only"
          IconContainerComponent={IconContainer}
          getLabelText={(felicidade) => customIcons[felicidade].label}
          onChange={handleRatingChange}
          highlightSelectedOnly
          value={felicidade}

        />
        <StyledRatingMoney
          name="Money-Rating"
          IconContainerComponent={IconContainerMoney}
          getLabelText={(dinheiro) => customIconMoney[dinheiro].label}
          onChange={handleMoneyChange}
          highlightSelectedOnly
          value={dinheiro}
        />
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