//Componente responsavel por Retornar um estado com base nas ações criadas.

const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_IMAGES':
      return { ...state, images: [...state.images, ...action.payload] };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };

    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };
    case 'UPDATE_UPDATED_PLACE':
      return { ...state, updatedPlace: action.payload };
    case 'UPDATE_DELETED_IMAGES':
      return {
        ...state,
        deletedImages: [...state.deletedImages, ...action.payload],
      };
    case 'UPDATE_ADDED_IMAGES':
      return {
        ...state,
        addedImages: [...state.addedImages, ...action.payload],
      };
    case 'RESET_PLACE':
      return {
        ...state,
        images: [],
        details: { title: '', description: '', price: 0 },
        location: { lng: 0, lat: 0 },
        updatedPlace: null,
        deletedImages: [],
        addedImages: [],
      };

    case 'UPDATE_PLACE':
      return { ...state, place: action.payload, addressFilter: null, priceFilter: 50, filteredPlaces: action.payload };

    case 'FILTER_PRICE':
      return {
        ...state,
        priceFilter: action.payload,
        filteredPlaces: applyFilter(
          state.place,
          state.addressFilter,
          action.payload
        ),
      };

    case 'FILTER_ADDRESS':
      return {
        ...state,
        addressFilter: action.payload,
        filteredPlaces: applyFilter(
          state.place,
          action.payload,
          state.priceFilter
        ),
      };
    case 'CLEAR_ADDRESS':
      return {
        ...state,
        addressFilter: null,
        priceFilter: 50,
        filteredPlaces: state.place,
      };
    case 'UPDATE_ESTABLISHMENT':
      return {
        ...state,
        establishment: action.payload
      };

    case 'UPDATE_USERS':
      return { ...state, users: action.payload };
    case 'DELETE_ESTABLISHMENT':
      return {
        ...state,
        place: state.place.filter((establishment) => establishment._id !== action.payload),
      };

    case 'UPDATE_SECTION':
      return { ...state, section: action.payload };
    default:
      throw new Error('Ação não especificada!');
  }

};

export default reducer;

const applyFilter = (place, address, price) => {
  let filteredPlaces = place
  if (address) {
    const { lng, lat } = address
    filteredPlaces = filteredPlaces.filter(place => {
      const lngDifference = lng > place.lng ? lng - place.lng : place.lng - lng
      const latDifference = lat > place.lat ? lat - place.lat : place.lat - lat
      return lngDifference <= 1 && latDifference <= 1
    })
  }

  if (price <= 50) {
    filteredPlaces = filteredPlaces.filter(place => place.price <= price)
  }

  return filteredPlaces;

}