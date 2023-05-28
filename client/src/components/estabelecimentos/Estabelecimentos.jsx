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

const Estabelecimentos = () => {
  const {state:{filteredPlaces},dispatch} = useValue();
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
                onClick={()=> dispatch({type:'UPDATE_ESTABLISHMENT', payload: establishment })}
              />
              <ImageListItemBar
                title={establishment.title}
                actionIcon={
                  <Rating
                    sx={{ color: 'rgba(255,255,255, 0.8)', mr: '5px' }}
                    name="establishment-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    emptyIcon={
                      <StarBorder sx={{ color: 'rgba(255,255,255, 0.8)' }} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Estabelecimentos;