//Componente responsavel por receber o estado inicial da conta passado pelo reducer e repassa-los a aplicação, por meio do useValue()

import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false, file: null, photoURL: '' },
  images: [],
  details: { title: '', description: '', price: 0 },
  location: { lng: 0, lat: 0 },
  updatedPlace: null,
  deletedImages: [],
  addedImages: [],
  place: [],
  priceFilter: 100,
  addressFilter: null,
  filteredPlaces: [],
  establishment: null,
  users: [],
  section: 0,
  ratings: 0,
  money: 0,
};


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

  useEffect(() => {
    if (state.currentUser) {
      const establishment = JSON.parse(localStorage.getItem(state.currentUser.id));
      if (establishment) {
        dispatch({ type: 'UPDATE_LOCATION', payload: establishment.location });
        dispatch({ type: 'UPDATE_DETAILS', payload: establishment.details });
        dispatch({ type: 'UPDATE_IMAGES', payload: establishment.images });
        dispatch({ type: 'UPDATE_UPDATED_PLACE', payload: establishment.updatedPlace });
        dispatch({
          type: 'UPDATE_DELETED_IMAGES',
          payload: establishment.deletedImages,
        });
        dispatch({ type: 'UPDATE_ADDED_IMAGES', payload: establishment.addedImages });
      }
    }
  }, [state.currentUser]);

  useEffect(() => {
    if (state.currentUser) {
      const establishment = JSON.parse(localStorage.getItem(state.currentUser.id))
      if (establishment) {
        dispatch({ type: 'UPDATE_LOCATION', payload: establishment.location })
        dispatch({ type: 'UPDATE_DETAILS', payload: establishment.details })
        dispatch({ type: 'UPDATE_IMAGES', payload: establishment.images })
        dispatch({ type: 'UPDATE_UPDATED_PLACE', payload: establishment.updatedPlace })
        dispatch({ type: 'UPDATE_DELETED_IMAGES', payload: establishment.deletedImages })
        dispatch({ type: 'UPDATE_ADDED_IMAGES', payload: establishment.addedImages })

      }
    }
  }, [state.currentUser])

  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>{children}</Context.Provider>
  );
};

export default ContextProvider;