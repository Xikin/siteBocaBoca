import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { MenuOpen, Lock } from '@mui/icons-material';

import Usericons from './user/Usericons';
import { useValue } from '../context/ContextProvider';



const NavBar = () => {

  const{state:{currentUser},
  dispatch
} = useValue()

  return (
    <>
    <AppBar style={{ background: '#8a00c2' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size="large" color="inherit">
              < MenuOpen/>
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >Boca-Boca         
           </Typography>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Boca-Boca
            </Typography>
          {!currentUser ? (
            <Button
              color="inherit"
              startIcon={<Lock />}
              onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
            >
              Login
            </Button>
          ) : (
            <Usericons />
          )}
        </Toolbar>
      </Container>
    </AppBar>
    <Toolbar />
    </>
  );
};

export default NavBar;
