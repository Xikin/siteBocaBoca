import { Logout, Settings } from '@mui/icons-material'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useValue } from '../../context/ContextProvider'
import useCheckToken from '../../hooks/useCheckToken'

const UserMenu = ({ anchorUserMenu, setAnchorUser }) => {
     useCheckToken();
     const { dispatch, state: { currentUser } } = useValue()
     const handlecloserUserMenu = () => {
          setAnchorUser(null)
     }

     const testAuthorization = async () => {
          const url = process.env.REACT_APP_SERVER_URL + '/room'
          try {
               const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                         authorization: `Bearer ${currentUser.token}`
                    },
               })
               const data = await response.json()
               console.log(data)
               if (!data.success) {
                    if(response.status === 401) dispatch({ type: 'UPDATE_USER', payload: null });
                    throw new Error(data.message)
               }
          } catch (error) {
               dispatch({ type: 'UPDATE_ALERT', payload: { open: true, message: error.message, severity: 'error' } })
               console.log(error)
          }
     }

     return (
          <Menu
               anchorEl={anchorUserMenu}
               open={Boolean(anchorUserMenu)}
               onClose={handlecloserUserMenu}
               onClick={handlecloserUserMenu}
          >
               <MenuItem onClick={testAuthorization}>
                    <ListItemIcon>
                         <Settings fontSize='small' />

                    </ListItemIcon>
                    Perfil
               </MenuItem>
               <MenuItem onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}>
                    <ListItemIcon>
                         <Logout fontSize='small' />

                    </ListItemIcon>
                    Sair
               </MenuItem>
          </Menu>

     )
}

export default UserMenu