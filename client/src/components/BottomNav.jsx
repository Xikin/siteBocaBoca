import React, { useRef } from 'react'
import {BottomNavigation, BottomNavigationAction, Box, Paper} from '@mui/material'
import { useState } from 'react'
import {LocationOn, AddLocationAlt} from '@mui/icons-material'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ClusterMap from './map/ClusterMap';
import Estabelecimentos from './estabelecimentos/Estabelecimentos';
import AddRoom from './addPlace/AddRoom';
import { useEffect } from 'react';
const BottomNav = () => {
 
 const [value, setValue]= useState(0)
 const ref = useRef()
 useEffect(()=>{
    ref.current.ownerDocument.body.scrollTop = 0;

 },[value])
 return (
<Box ref={ref}>
    {{
        0:<ClusterMap/>,
        1:<Estabelecimentos/>,
        2:<AddRoom/>,
    }[value]}
<Paper
elevation={3}
sx={{position:'fixed', bottom:0, left:0, right:0,  zIndex:2}}
>
<BottomNavigation
showLabels
value={value}
onChange={(e, newValue)=>setValue(newValue)}
>
    <BottomNavigationAction label='Map' icon={<LocationOn/>} />
    <BottomNavigationAction label='Estabelecimentos' icon={<RestaurantIcon/>} />
    <BottomNavigationAction label='Add' icon={<AddLocationAlt/>} />

</BottomNavigation>
</Paper>
</Box>
    )
}

export default BottomNav