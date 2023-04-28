import Login from './components/user/Login'
import React from 'react'
import NavBar from './components/NavBar'
import Notification from './components/Notification'
import Loading from './components/Loading'
import BottomNav from './components/BottomNav'

const App = () => {
  return (
 //Componentes Tela principal.
    <>
      <Loading/>
      <Notification/>
      <Login/>
      <NavBar/>
      <BottomNav />
    </>
    )
}

export default App