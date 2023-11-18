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
            return { ...state, alert: action.payload }
        case 'UPDATE_USER':
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            return { ...state, currentUser: action.payload }


        default:
            throw new Error('Ação não disponível');
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