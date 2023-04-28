//Componente responsável por criar uma barra lateral que recebera a filtragem por preço



import { Box, Drawer, IconButton, styled, Typography } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import PriceSlider from './PriceSlider';
import { useValue } from '../../context/ContextProvider';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { containerRef } = useValue();
  return (
    <Drawer variant="persistent" hideBackdrop={true} open={isOpen}>
      <DrawerHeader>
        <Typography>Pesquisar ou Filtrar:</Typography>
        <IconButton onClick={() => setIsOpen(false)}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Box sx={{ width: 240, p: 3 }}>
        <Box ref={containerRef}></Box>
        <PriceSlider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;