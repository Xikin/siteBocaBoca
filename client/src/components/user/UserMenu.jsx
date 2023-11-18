import { Dashboard, Logout, Settings } from '@mui/icons-material';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useValue } from '../../context/ContextProvider';
import useCheckToken from '../../hooks/useCheckToken';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/user';
import { storePlace } from '../../actions/place';

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {

 
  useCheckToken();
  const {
    dispatch,
    state: { currentUser, location, details, addedImages, deletedImages, images, updatedPlace },
  } = useValue();
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    storePlace(location, details, images, updatedPlace, deletedImages, addedImages, currentUser.id)
    logout(dispatch)
  }


  useEffect(() => {
    const storeBeforeLeave = (e) => {
      if (storePlace(location, details, images, updatedPlace, deletedImages, addedImages, currentUser.id)) {
        e.preventDefault()
        e.returnValue = true
      }
    }

    window.addEventListener('beforeunload', storeBeforeLeave);
    return () => window.removeEventListener('beforeunload', storeBeforeLeave);

  }, [location, details, images]);
  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
      >
        {!currentUser.google && (
          <MenuItem
            onClick={() =>
              dispatch({
                type: 'UPDATE_PROFILE',
                payload: {
                  open: true,
                  file: null,
                  photoURL: currentUser?.photoURL,
                },
              })
            }
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Perfil
          </MenuItem>
        )}
        <MenuItem
          onClick={() => navigate('dashboard')}
        >
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        {!currentUser.google && (
          <MenuItem
            onClick={ ()=> navigate('')}
          >
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Mudar senha
          </MenuItem>
        )}

      </Menu>
      <Profile />
  
    
    </>
  );
};

export default UserMenu;