//Componente do responsavel por mostrar as informações do local cadastrado.

import {
    AppBar,
    Avatar,
    Box,
    Container,
    Dialog,
    IconButton,
    Rating,
    Slide,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
  } from '@mui/material';
  import { forwardRef, useEffect, useState } from 'react';
  import { useValue } from '../../context/ContextProvider';
  import { Close, StarBorder } from '@mui/icons-material';
  
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Navigation, Autoplay, EffectCoverflow, Zoom } from 'swiper';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/zoom';
  
  //Retorna um Slide do Material UI  para criar um efeito de transição quando o diálogo do estabelecimento é aberto.
  const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });
  
  const Place = () => {
    const {
      state: { establishment },
      dispatch,
    } = useValue();
  
    const [local, setLocal] = useState(null);
  
    useEffect(() => {
      if (establishment) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${establishment.lng},${establishment.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN }`;
        
        fetch(url)
          .then(response => response.json())
          .then(data => setLocal(data.features[0]));
      }
    }, [establishment]);
  
    const handleClose = () => {
      dispatch({ type: 'UPDATE_ESTABLISHMENT', payload: null });
    };
    return (
      <Dialog
        fullScreen
        open={Boolean(establishment)}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{bgcolor: '#8A00C2'}} position="relative">
          <Toolbar>
            <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
              {establishment?.title}
            </Typography>
            <IconButton color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container sx={{ pt: 5 }}>
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
            centeredSlides
            slidesPerView={2}
            grabCursor
            navigation
            autoplay
            zoom
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
          >
            {establishment?.images?.map((url) => (
              <SwiperSlide key={url}>
                <div className="swiper-zoom-container">
                  <img src={url} alt="establishment" />
                </div>
              </SwiperSlide>
            ))}
            <Tooltip
              title={establishment?.uName || ''}
              sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                zIndex: 2,
              }}
            >
              <Avatar src={establishment?.uPhoto} />
            </Tooltip>
          </Swiper>
          <Stack sx={{ p: 3 }} spacing={2}>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" component="span">
                  {'Preço Pago: '}
                </Typography>
                <Typography component="span">
                  {establishment?.price === 0 ? 'Preço gasto não especificado' : 'R$' + establishment?.price}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="span">
                  {'Ratings: '}
                </Typography>
                <Rating
                  name="establishment-ratings"
                  defaultValue={3.5}
                  precision={0.5}
                  emptyIcon={<StarBorder />}
                />
              </Box>
            </Stack>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Box>
                <Typography variant="h6" component="span">
                  {'Onde fica: '}
                </Typography>
                <Typography component="span">{local?.text}</Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="span">
                  {'Endereço: '}
                </Typography>
                <Typography component="span">{local?.place_name}</Typography>
              </Box>
            </Stack>
            <Stack>
              <Typography variant="h6" component="span">
                {'Detalhes: '}
              </Typography>
              <Typography component="span">{establishment?.description}</Typography>
            </Stack>
          </Stack>
        </Container>
      </Dialog>
    );
  };
  
  export default Place;