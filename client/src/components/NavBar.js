import React, { useState } from 'react';
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
import Sidebar from './sidebar/Sidebar';



const NavBar = () => {

  const{state:{currentUser},
  dispatch
} = useValue()

const [isOpen, setIsOpen]= useState(false); // controla a abertura do componente Sidebar.jsx

  return (
    <>
    <AppBar style={{ background: '#8a00c2' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <IconButton size="large" color="inherit" onClick={()=> setIsOpen(true)}>
              < MenuOpen/>
            </IconButton>
          </Box>
          <Box noWrap component='img' title='Logo' sx={{width:'80', }} src="https://cdn.pixabay.com/photo/2017/08/18/15/00/help-2655258_960_720.png"/>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >Conecta RS         
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
    <Sidebar {...{isOpen,setIsOpen}}/>
    </>
  );
};

export default NavBar;
