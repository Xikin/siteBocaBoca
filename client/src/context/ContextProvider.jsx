//Componente responsavel por receber o estado inicial da conta passado pelo reducer e repassa-los a aplicação, por meio do useValue()

import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import reducer from './reducer';
//Contexto inicial dos componentes e dados.
const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false, file: null, photoURL: '' },
  images: [],
  details: { title: '', description: '', price: 0 },
  location: { lng: 0, lat: 0 },
  place: [],
  priceFilter: 100,
  addressFilter: null,
  filteredPlaces: [],
};
 
//Criando o contexto inicial dos componentes para e os repassando para o Context provider.
const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  const containerRef = useRef();
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    }
  }, []);
  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>{children}</Context.Provider>
  );
};

export default ContextProvider;