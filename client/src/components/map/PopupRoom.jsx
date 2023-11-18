
//Componente responsável pelo componente que aparecerá no click do avatar do usário que cadastrou um local no mapa.

import { Box, Card, ImageListItem, ImageListItemBar } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useValue } from '../../context/ContextProvider';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const PopupRoom = ({ popupInfo }) => {
  const { title, description, price, images, ratings, money } = popupInfo;
  const { dispatch } = useValue();
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

  const customIconMoney = {
    1: {
      icon: <RiMoneyDollarCircleFill />,
      label: 'Muito Barato',
    },
    2: {
      icon: <RiMoneyDollarCircleFill />,
      label: 'Barato',
    },
    3: {
      icon: <RiMoneyDollarCircleFill />,
      label: 'Custo Benefico',
    },
    4: {
      icon: <RiMoneyDollarCircleFill />,
      label: 'Caro',
    },
    5: {
      icon: <RiMoneyDollarCircleFill />,
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

  return (
    <Card sx={{ maxWidth: 400 }} style={{ backgroundColor: "#FCFCFF" }}>
      <ImageListItem sx={{ display: 'block' }}>
        <ImageListItemBar
          sx={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
            zIndex: 2,
          }}
          title={price === 0 ? 'Preço Não especificado' : 'R$' + price}
          position="top"
        />
        <ImageListItemBar
          title={title}
          subtitle={description.substr(0, 30) + '...'}
          sx={{ zIndex: 2 }}
        />
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay
          pagination={{ clickable: true }}
          style={{
            '--swiper-pagination-color': 'rgba(255,255,255, 0.8)',
            '--swiper-pagination-bullet-inactive-color': '#fff',
            '--swiper-pagination-bullet-inactive-opacity': 0.5,
          }}
        >
          {images.map((url) => (
            <SwiperSlide key={url}>
              <Box
                component="img"
                src={url}
                alt="room"
                sx={{
                  height: 255,
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  cursor: 'pointer',
                  objectFit: 'cover',
                }}
                onClick={() =>
                  dispatch({ type: 'UPDATE_ESTABLISHMENT', payload: popupInfo })
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageListItem>
      <StyledRating
          name="establishment-ratings"
          defaultValue={ratings}
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
          disabled
          sx={{pl:1}}
        />
        <StyledRating
          name="establishment-ratings"
          defaultValue={money}
          IconContainerComponent={IconContainerMoney}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
          disabled
          sx={{pl:16.5}}
        />
    </Card>
  );
};

export default PopupRoom;