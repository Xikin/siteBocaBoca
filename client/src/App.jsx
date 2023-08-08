import  Dashboard from './pages/dashboard/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Notification from './components/Notification'
import Loading from './components/Loading'
import Estabelecimento from './components/estabelecimentos/Estabelecimento'
const App = () => {
  return (

    <>
    <Loading/>
    <Notification/>
      <BrowserRouter>
        <Routes>
          <Route path='dashboard/*' element={<Dashboard/>} />
          <Route path='*' element={<Home />} />
           
          
        </Routes>
      </BrowserRouter>
      <Estabelecimento/>
    </>
    )
}

export default App