import Login from '../components/user/Login'
import React from 'react'
import NavBar from '../components/NavBar'
import Notification from '../components/Notification'
import Loading from '../components/Loading'
import BottomNav from '../components/BottomNav'
import Place from '../components/estabelecimentos/Estabelecimento'

const Home = () => {
  return (

    <>
      <Loading/>
      <Notification/>
      <Login/>
      <NavBar/>
      <BottomNav />
      <Place/>
    </>
    )
}

export default Home;