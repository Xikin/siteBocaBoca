import React from 'react'
import{Avatar, Badge, Box, IconButton, Tooltip} from '@mui/material'
import { Mail, Notifications } from '@mui/icons-material'
import { useValue } from '../../context/ContextProvider'
import UserMenu from './UserMenu'
import { useState } from 'react'
import useCheckToken from '../../hooks/useCheckToken'


const Usericons = () => {
    useCheckToken();
    


    //Controla a verificação do usuário logado a partir do contexto
    const {state:{currentUser}} = useValue()

    //Controla a verificação do Usermenu se está aberto ou fechado
    //Recebe o valor null (closed) como default
const[anchorUserMenu, setAnchorUserMenu] = useState(null)

  return (

<Box>
<Tooltip title='Abrir configurações'>

{/* No clique do Avatar do usuário disparará o evento para abertura do component UserMenu */}
<IconButton  onClick={(e)=>setAnchorUserMenu(e.currentTarget)}>
    <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
    {currentUser?.name?.charAt(0).toUpperCase()}
    </Avatar>
</IconButton>
</Tooltip>

<UserMenu {...{anchorUserMenu,setAnchorUserMenu}}/>
</Box>
    )
}

export default Usericons