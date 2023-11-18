import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { StarBorder } from '@mui/icons-material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Estabelecimentos = () => {
  const { state: { filteredPlaces }, dispatch } = useValue();

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
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}
      >
        {filteredPlaces.map((establishment) => (
          <Card key={establishment._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}
                title={establishment.price === 0 ? 'Preço não especificado' : 'R$' + establishment.price}
                actionIcon={
                  <Tooltip title={establishment.uName} sx={{ mr: '5px' }}>
                    <Avatar src={establishment.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={establishment.images[0]}
                alt={establishment.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({ type: 'UPDATE_ESTABLISHMENT', payload: establishment })}
              />
              <ImageListItemBar
                title={establishment.title}
                actionIcon={
                  <StyledRating
                    name="establishment-ratings"
                    defaultValue={establishment?.ratings}
                    IconContainerComponent={IconContainer}
                    highlightSelectedOnly
                    readOnly
                    sx={{pr:2}}
                  />
                }
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.9)95%, rgba(0,0,0,0)100%)',
                }}
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Estabelecimentos;